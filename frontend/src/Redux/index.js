

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { reducer as CategoryReducer } from './Reducers/Category'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const appReducer = combineReducers({
	category: CategoryReducer,
})

export default appReducer

export const store = createStore(
	appReducer,
	composeWithDevTools(	
		applyMiddleware(thunk)
	)
)
