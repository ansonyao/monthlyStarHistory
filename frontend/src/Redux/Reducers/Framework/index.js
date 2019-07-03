import { createActions, createReducer } from 'reduxsauce'
import thunks from './thunks'
import _ from 'lodash'
const uuidv4 = require('uuid/v4');

const createFramework = () => {
	return ({
		framework: {
			owner: "repo owner",
			name: "name",
			id: uuidv4(),
		},
		result: []
	})
}

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
	data: [createFramework()]
}

/* ------------- Create Actions ------------- */
export const { Types, Creators } = createActions({
	fetchFrameworkHistory: ['framework', 'result'],
	removeFramework: ['framework'],
	addFramework: [], 
	updateFramework: ['framework', 'owner', 'name']
})

export const reducer = createReducer(INITIAL_STATE, {
	[Types.FETCH_FRAMEWORK_HISTORY]: (state, { framework, result } ) => {
		let dataCopy = _.cloneDeep(state.data)
		let matchedFramework = dataCopy.filter(data => data.framework.id === framework.id)[0]
		console.log('matchedFramework')
		matchedFramework.result = result
		return { ...state, data: dataCopy}
	},
	[Types.REMOVE_FRAMEWORK]: (state, { framework } ) => {
		const dataCopy = _.cloneDeep(state.data).filter(data => data.framework.id !== framework.id)
		return { ...state, data: dataCopy}
	},
	[Types.ADD_FRAMEWORK]: (state) => {
		return { ...state, data: [...state.data, createFramework()]}
	},
	[Types.UPDATE_FRAMEWORK]: (state, { framework, owner, name } ) => {
		let dataCopy = _.cloneDeep(state.data)
		let matchedFramework = dataCopy.filter(data => data.framework.id === framework.id)[0]
		matchedFramework.framework.owner = owner
		matchedFramework.framework.name = name
		return { ...state, data: dataCopy}
	},
})

export default Creators
export { thunks }