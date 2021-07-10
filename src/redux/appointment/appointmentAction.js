import {FETCH_APPOINTMENT_INITIAL, FETCH_APPOINTMENT_REQUEST, FETCH_APPOINTMENT_SUCCESS, FETCH_APPOINTMENT_FAILURE, GET_APPOINTMENT_DETAILS } from './appointmentType'

export const fetchAppointmentinitial = (appointmen) => {
	return {
		type: FETCH_APPOINTMENT_INITIAL,
		payload: appointmen
	}
}


export const fetchAppointmentRequest = () => {
	return {
		type: FETCH_APPOINTMENT_REQUEST
	}
}

export const fetchAppointmentSuccess = (appointmen) => {
	return {
		type: FETCH_APPOINTMENT_SUCCESS,
		payload: appointmen
	}
}

export const fetchAppointmentFailure = (error) => {
	return {
		type: FETCH_APPOINTMENT_FAILURE,
		payload: error
	}
}

export const getapponeintmentDetails = (details) => {
	return {
		type: GET_APPOINTMENT_DETAILS,
		payload: details
	}
}

export const  getAppointmentList = () => {
	let appointmenList = JSON.parse(localStorage.getItem('appointmens'));
	return (dispatch) => {
	
		dispatch(fetchAppointmentinitial(appointmenList))
	}
}

export const  fetchAppointmentList = (params) => {

	return (dispatch) => {
	
		dispatch(fetchAppointmentSuccess(params))
	}
}

export const  apponeintmentDetails = (param) => {
	return (dispatch) => {
	
		dispatch(getapponeintmentDetails(param))
	}
}