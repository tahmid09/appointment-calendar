import {FETCH_APPOINTMENT_INITIAL, FETCH_APPOINTMENT_REQUEST, FETCH_APPOINTMENT_SUCCESS, FETCH_APPOINTMENT_FAILURE, GET_APPOINTMENT_DETAILS } from './appointmentType'

const inititalState = {
	appointments: [],
	details:{}
}


const appointmentReducer = (state = inititalState, action) => {
	switch (action.type) {
		case FETCH_APPOINTMENT_INITIAL: return {
			...state,
			loading: false,
			appointments: action.payload
		}
		case FETCH_APPOINTMENT_REQUEST: return {
			...state,
			loading: true
		}
		case FETCH_APPOINTMENT_SUCCESS: return {
			...state,
			loading: false,
			appointments: action.payload
		}
		case FETCH_APPOINTMENT_FAILURE: return {
			...state,
			loading: false,
			error: action.payload
		}
		case GET_APPOINTMENT_DETAILS: return {
			...state,
			loading: false,
			details: action.payload
		}
		default: return state
	}
}

export default appointmentReducer