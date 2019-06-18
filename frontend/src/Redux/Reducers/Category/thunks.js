import Actions from './index'
import API from 'Service'
import _ from 'lodash'

const fetchCategories = () => {
	return async dispatch => {
        try {
            let response = await API.getCategories() 
            let action = Actions.fetchCategoriesSuccess(response.data)
            dispatch(action)
        } catch(e) {
            console.log(e)
        }
	}
}


const fetchHistory = (category) => {
    return async dispatch => {
        console.log("fetchHistory called")
        try {
            let response = await API.getHistory(category) 
            let items = response.data.Items
            items.sort((x, y) => {
                const xLastValue = _.last(x.history).value
                const yLastValue = _.last(y.history).value
                return  yLastValue - xLastValue
            })
            let action = Actions.fetchHistorySuccess(response.data.Items)
            dispatch(action)
        } catch(e) {
            console.log(e)
        }
    }
}

export default { fetchCategories, fetchHistory }

