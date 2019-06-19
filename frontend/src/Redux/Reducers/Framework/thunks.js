import Actions from './index'
import { getStartHistoryWrapper } from 'Service'

const fetchHistory = ({owner, name}) => {
    return async dispatch => {
        console.log("fetchHistory called")
        try {
            let result = await getStartHistoryWrapper({owner, name})
            console.log(result)
            dispatch(Actions.fetchFrameworkHistory({framework: {owner, name}, data: result}))
        } catch(e) {
            console.log(e)
        }
    }
}

export default { fetchHistory }

