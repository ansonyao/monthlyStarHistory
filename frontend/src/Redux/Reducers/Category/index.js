import { createActions, createReducer } from 'reduxsauce'
import thunks from './thunks'

/* ------------- Initial State ------------- */
const INITIAL_STATE = {
	categories: [],
	history: []
}

/* ------------- Create Actions ------------- */
export const { Types, Creators } = createActions({
	fetchCategoriesSuccess: ['categories'],
	fetchHistorySuccess: ['data']
})

export const reducer = createReducer(INITIAL_STATE, {
	[Types.FETCH_CATEGORIES_SUCCESS]: (state, {categories} ) => {
		return { ...state, categories }
	},
	[Types.FETCH_HISTORY_SUCCESS]: (state, {data} ) => {
		return { ...state, history: data }
	},
})

export default Creators
export { thunks }