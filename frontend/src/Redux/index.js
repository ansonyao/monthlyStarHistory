

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { reducer as FrameworkReducer } from './Reducers/Framework'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const appReducer = combineReducers({
	framework: FrameworkReducer,
})

export default appReducer

export const store = createStore(
	appReducer,
	composeWithDevTools(	
		applyMiddleware(thunk)
	)
)
