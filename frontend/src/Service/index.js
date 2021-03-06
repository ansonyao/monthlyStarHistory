
import ApolloClient, { gql } from "apollo-boost";
import _ from 'lodash';
import axios from 'axios';

var bearerToken

var getHeaders = () => {
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
    }

    if (bearerToken) {
        headers.Authorization = `Bearer ${bearerToken}`
    }    

    return headers
}

let page = 0

var getGithubStarGql = async ({owner, name, cursor}) => {
    const queryString = gql`
    query fetchGithubStars($owner: String!, $name: String!, $cursor: String) {
        repository(owner: $owner, name: $name) {
            stargazers(last: 100, before: $cursor) {
                totalCount
                edges{
                    starredAt
                    cursor
                }
            }
        }
        rateLimit {
            limit
            cost
            remaining
            resetAt
        }
    }
    `
    let response = await axios.get("https://jsondataanson.s3.ca-central-1.amazonaws.com/keyfile.json")
    bearerToken = response.data.key
    return new Promise((resolve, reject) => {
        const client = new ApolloClient({
            uri: "https://api.github.com/graphql",
            headers: getHeaders()
        });

        client
            .query({
                query: queryString,
                variables: {
                    owner,
                    name,
                    cursor
                },
            })
            .then(info => {
                const result = info.data.repository.stargazers
                console.log(`page: ${page}`)
                page += 1
                resolve(result)
            })
            .catch(e => {
                console.log(e)
                reject(e)
            })
    })
}

export const getStarHistoryWrapper = async ({owner, name}, onProgress) => {
    let finalResult = []
    let cursor = null
    let {edges: pageResult, totalCount} = await getGithubStarGql({owner, name, cursor})
    cursor = _.first(pageResult).cursor
    finalResult = pageResult.map(x => x.starredAt).concat(finalResult)
    while (pageResult.length > 0) {
        const tmp = await getGithubStarGql({owner, name, cursor})
        pageResult = tmp.edges
        if (pageResult.length > 0) {
            cursor = _.first(pageResult).cursor
            finalResult = pageResult.map(x => x.starredAt).concat(finalResult)
            onProgress && onProgress(finalResult.length, totalCount)
        } else {
            break
        }
    }
    return analyzeResult(finalResult)
}

const analyzeResult = (starredAtArray) => {
  // promises to request sampleUrls
  const firstDate = new Date(starredAtArray[0])
  const firstDateYear = firstDate.getFullYear()
  const firstDateMonth = firstDate.getMonth()

//   const lastDate = new Date(starredAtArray[starredAtArray.length - 1])
  const lastDate = new Date()
  const lastDateYear = lastDate.getFullYear()
  const lastDateMonth = lastDate.getMonth()

  let yearMonthArray = []
  let tmpMonth = firstDateMonth
  let tmpYear = firstDateYear
  while((tmpMonth + tmpYear * 12) <= (lastDateMonth + lastDateYear * 12)) {
    yearMonthArray.push({"year": tmpYear, "month": tmpMonth})
    tmpMonth += 1
    if (tmpMonth === 12) {
      tmpMonth = 0
      tmpYear += 1
    }
  }
  var result = [];
  var monthIndex = 1;
  for(let i=0; i<starredAtArray.length; i++) {
    if(monthIndex >= yearMonthArray.length) { continue }
    const dateStr = starredAtArray[i]
    const date = new Date(dateStr)
    const nextMonth = yearMonthArray[monthIndex]
    const thisMonth = yearMonthArray[monthIndex - 1]
    if (compareMonthYear(date.getMonth(), date.getFullYear(), nextMonth.month, nextMonth.year) <= 0) {
      result[monthIndex-1] = {"value": i, "month": thisMonth.month, "year": thisMonth.year};
      monthIndex += 1;
    }
  }
  let length = result.length
  for (let i=length; i<yearMonthArray.length; i++) {
    result[i] = {"value": starredAtArray.length, "month": yearMonthArray[i].month, "year": yearMonthArray[i].year}; 
  }
  return result;
}

function compareMonthYear(m1, y1, m2, y2) {
  return (m2 + y2 * 12) - (m1 + y1 * 12)
}
