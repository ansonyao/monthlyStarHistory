import Actions from './index'
import { getStarHistoryWrapper } from 'Service'

const fetchHistory = (framework) => {
    return async dispatch => {
        try {
            let result = await getStarHistoryWrapper(framework, (worked, total) => {
                dispatch(Actions.fetchFrameworkProgress(framework, worked, total))
            })
            dispatch(Actions.fetchFrameworkHistory(framework, result))
        } catch(e) {
            console.log(e)
            dispatch(Actions.fetchFrameworkHistoryFailed(framework, e))
        }
    }
}

export default { fetchHistory }

