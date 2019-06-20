import Actions from './index'
import { getStarHistoryWrapper } from 'Service'

const fetchHistory = ({owner, name}) => {
    return async dispatch => {
        console.log("fetchHistory called")
        try {
            let result = await getStarHistoryWrapper({owner, name})
            console.log(result)
            dispatch(Actions.fetchFrameworkHistory({owner, name}, result))
        } catch(e) {
            console.log(e)
        }
    }
}

export default { fetchHistory }

