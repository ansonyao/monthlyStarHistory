import { createActions, createReducer } from 'reduxsauce'
import thunks from './thunks'
import _ from 'lodash' 

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
	data: []
}

/* ------------- Create Actions ------------- */
export const { Types, Creators } = createActions({
	fetchFrameworkHistory: ['framework', 'result'],
	fetchFrameworkProgress: ['framework', 'worked', 'total'],
	fetchFrameworkHistoryFailed: ['framework', 'error'],
	removeFramework: ['framework'],
	addFramework: ['framework'], 
	updateFramework: ['framework', 'owner', 'name']
})

export const reducer = createReducer(INITIAL_STATE, {
	[Types.FETCH_FRAMEWORK_HISTORY]: (state, { framework, result } ) => {
		let dataCopy = _.cloneDeep(state.data)
		let matchedFramework = dataCopy.filter(data => data.framework.id === framework.id)[0]
		matchedFramework.result = result
		matchedFramework.loading = false
		matchedFramework.dataError = null
		return { ...state, data: dataCopy}
	},
	[Types.FETCH_FRAMEWORK_PROGRESS]: (state, { framework, worked, total } ) => {
		let dataCopy = _.cloneDeep(state.data)
		let matchedFramework = dataCopy.filter(data => data.framework.id === framework.id)[0]
		matchedFramework.worked = worked
		matchedFramework.total = total
		return { ...state, data: dataCopy}
	},
	[Types.FETCH_FRAMEWORK_HISTORY_FAILED]: (state, { framework, error } ) => {
		let dataCopy = _.cloneDeep(state.data)
		let matchedFramework = dataCopy.filter(data => data.framework.id === framework.id)[0]
		matchedFramework.loading = false
		matchedFramework.dataError = error
		return { ...state, data: dataCopy}
	},
	[Types.REMOVE_FRAMEWORK]: (state, { framework } ) => {
		const dataCopy = _.cloneDeep(state.data).filter(data => data.framework.id !== framework.id)
		return { ...state, data: dataCopy}
	},
	[Types.ADD_FRAMEWORK]: (state, { framework }) => {
		return { ...state, data: [...state.data, framework]}
	},
	[Types.UPDATE_FRAMEWORK]: (state, { framework, owner, name } ) => {
		let dataCopy = _.cloneDeep(state.data)
		let matchedFramework = dataCopy.filter(data => data.framework.id === framework.id)[0]
		matchedFramework.framework.owner = owner
		matchedFramework.framework.name = name
		matchedFramework.dataError = null
		return { ...state, data: dataCopy}
	},
})

export default Creators
export { thunks }