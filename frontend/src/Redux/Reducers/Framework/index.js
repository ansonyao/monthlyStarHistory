import { createActions, createReducer } from 'reduxsauce'
import thunks from './thunks'
import _ from 'lodash'

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
	data: []
}

const sample = {
	framework: {
		owner: "repo owner",
		name: "name",
	},
	result: []
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
		return { ...state, data: [...state.data, { framework, result }]}
	},
	[Types.REMOVE_FRAMEWORK]: (state, { framework } ) => {
		const dataCopy = _.cloneDeep(state.data).filter((f) => !isSameFramework(f.framework, framework))
		return { ...state, data: dataCopy}
	},
	[Types.ADD_FRAMEWORK]: (state) => {
		return { ...state, data: [...state.data, _.cloneDeep(sample)]}
	},
	[Types.UPDATE_FRAMEWORK]: (state, { framework, owner, name } ) => {
		let dataCopy = _.cloneDeep(state.data)
		let matchedFramework = dataCopy.filter((f) => isSameFramework(f.framework, framework))[0]
		matchedFramework.framework.owner = owner
		matchedFramework.framework.name = name
		return { ...state, data: dataCopy}
	},
})

const isSameFramework = (f1, f2) => {
	if (!f1 || !f2) {
		return false
	}
	return (f1.owner === f2.owner) && (f1.name === f2.name)
}

export default Creators
export { thunks }