import { createActions, createReducer } from 'reduxsauce'
import thunks from './thunks'

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
	data: []
}

/* ------------- Create Actions ------------- */
export const { Types, Creators } = createActions({
	fetchFrameworkHistory: ['framework', 'result'],
})

export const reducer = createReducer(INITIAL_STATE, {
	[Types.FETCH_FRAMEWORK_HISTORY]: (state, { framework, result } ) => {
		return { ...state, data: [...state.data, { framework, result }]}
	},
})

export default Creators
export { thunks }