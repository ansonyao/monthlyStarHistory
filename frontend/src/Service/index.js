
import ApolloClient, { gql } from "apollo-boost";

import _ from 'lodash';

var bearerToken = "028f2d2219db8dbde0f9de175840b819e20346de"

var getHeaders = () => {
    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
    }

    if (bearerToken) {
        headers.Authorization = `Bearer ${bearerToken}`
    }    

    return headers
}

const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: getHeaders()
});

let page = 0

var getGithubStarGql = async ({owner, name, cursor}) => {
    const queryString = gql`
    query fetchGithubStars($owner: String!, $name: String!, $cursor: String) {
        repository(owner: $owner, name: $name) {
            stargazers(first: 100, after: $cursor) {
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
    return new Promise((resolve, reject) => {
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
                const result = info.data.repository.stargazers.edges
                console.log(_.last(result) && _.last(result).starredAt)
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

export const getStartHistoryWrapper = async ({owner, name}) => {
    let finalResult = []
    let cursor = null
    let pageResult = await getGithubStarGql({owner, name, cursor})
    cursor = _.last(pageResult).cursor
    finalResult = finalResult.concat(pageResult.map(x => x.starredAt))
    while (pageResult.length > 0) {
        pageResult = await getGithubStarGql({owner, name, cursor})
        if (pageResult.length > 0) {
            cursor = _.last(pageResult).cursor
            finalResult = finalResult.concat(pageResult.map(x => x.starredAt))
        } else {
            break
        }
    }
    console.log(finalResult.length)
    return finalResult
}