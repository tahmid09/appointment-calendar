import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import appointmentReducer from './appointment/appointmentReducer'

const rootReducer = combineReducers({
	appointment: appointmentReducer
});

const store = createStore(rootReducer, applyMiddleware( thunk))

export default store
