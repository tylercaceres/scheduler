import {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors';

export default function useApplicationData() {
	/*NEW SECTION - REDUCER - START */
	const SET_DAY = 'SET_DAY';
	const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
	const SET_INTERVIEW = 'SET_INTERVIEW';

	function reducer(state, action) {
		const {appointments, day, days, id, interview, interviewers, type} = action;
		switch (type) {
			case SET_DAY:
				return {...state, day};
			case SET_APPLICATION_DATA:
				return {...state, days, appointments, interviewers};
			case SET_INTERVIEW: {
				const appointment = {
					...state.appointments[id],
					interview: {interview}
				};
				const appointments = {
					...state.appointments,
					[id]: appointment
				};
				return {...state, appointments};
			}
			default:
				throw new Error(`Tried to reduce with unsupported action type: ${type}`);
		}
	}
	/*NEW SECTION - REDUCER - END */

	const [state, dispatch] = useReducer(reducer, {
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {}
	});

	const setDay = (day) => dispatch({type: SET_DAY, day});

	// const setDay = (day) => setState((prev) => ({...prev, day}));
	// const setDays = (days) => setState((prev) => ({...prev, days}));
	// const setAppointments = (appointments) => setState((prev) => ({...prev, appointments}));
	// const setInterviewers = (interviewers) => setState((prev) => ({...prev, interviewers}));

	useEffect(() => {
		Promise.all([
			axios.get(`http://localhost:3001/api/days`),
			axios.get(`http://localhost:3001/api/appointments`),
			axios.get(`http://localhost:3001/api/interviewers`)
		])
			.then((response) => {
				dispatch({
					type: SET_APPLICATION_DATA,
					days: response[0].data,
					appointments: response[1].data,
					interviewers: response[2].data
				});
				// const renderState = {
				// 	day: state.day,
				// 	days: response[0].data,
				// 	appointments: response[1].data,
				// 	interviewers: response[2].data
				// };
				// setState(renderState);
			})
			.catch((err) => console.log('Error message :', err));
	}, [state]);

	const appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);

	//pass the bookInterview action each Appointment component
	const bookInterview = (id, interview) => {
		// const appointment = {
		// 	...state.appointments[id],
		// 	interview: {...interview}
		// };
		// const appointments = {
		// 	...state.appointments,
		// 	[id]: appointment
		// };
		console.log('BOOKINTERVIEW ID:', id);
		console.log('BOOKINTERVIEW interview:', interview);
		return axios.put(`http://localhost:3001/api/appointments/${id}`, {interview}).then((res) => {
			// setState({...state, appointments: appointments});
			dispatch({type: SET_INTERVIEW, id, interview});
			return res;
		});
		// .catch((err) => {
		// 	console.log('error:', err);
		// });

		// console.log(id, interview);
	};

	const deleteInterview = (id, interview) => {
		// const appointment = {
		// 	...state.appointments[id],
		// 	interview: null
		// };
		// const appointments = {
		// 	...state.appointments,
		// 	[id]: appointment
		// };
		console.log('BOOKINTERVIEW ID:', id);
		console.log('BOOKINTERVIEW interview:', interview);
		return axios.delete(`http://localhost:3001/api/appointments/${id}`, {interview}).then((res) => {
			// setState({...state, appointments: appointments});
			dispatch({type: SET_INTERVIEW, id, interview: null});
			return res;
		});
		// .catch((err) => {
		// 	console.log(err);
		// });

		// console.log(id, interview);
	};

	// *****
	console.log('STATE HERE', state);
	console.log('STATE DAY HERE', state.day);
	console.log('INTERVIEWERS HERE', interviewers);
	// *****

	return {
		state,
		setDay,
		bookInterview,
		deleteInterview
	};
}
