import {useEffect, useReducer} from 'react';
import axios from 'axios';

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
			})
			.catch((err) => console.warn('Error message :', err));
	}, [state]);

	const bookInterview = (id, interview) => {
		return axios.put(`http://localhost:3001/api/appointments/${id}`, {interview}).then((res) => {
			dispatch({type: SET_INTERVIEW, id, interview});
			return res;
		});
	};

	const deleteInterview = (id, interview) => {
		return axios.delete(`http://localhost:3001/api/appointments/${id}`, {interview}).then((res) => {
			dispatch({type: SET_INTERVIEW, id, interview: null});
			return res;
		});
	};

	return {
		state,
		setDay,
		bookInterview,
		deleteInterview
	};
}
