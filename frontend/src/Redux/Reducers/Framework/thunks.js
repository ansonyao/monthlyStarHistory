import Actions from './index'
import { getStarHistoryWrapper } from 'Service'

const fetchHistory = (framework) => {
    return async dispatch => {
        console.log("fetchHistory called")
        try {
            let result = await getStarHistoryWrapper(framework)
            console.log('fetch history returned')
            console.log(framework)
            console.log(result)
            dispatch(Actions.fetchFrameworkHistory(framework, result))
        } catch(e) {
            console.log(e)
        }
    }
}

export default { fetchHistory }

