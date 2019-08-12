import React, {useState, useEffect} from 'react';
import DayList from './DayList';
import Appointment from './Appointment/index';
import axios from 'axios';

import 'components/Application.scss';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
	const {state, setDay, bookInterview, deleteInterview} = useApplicationData();
	// const [state, setState] = useState({
	// 	day: 'Monday',
	// 	days: [],
	// 	appointments: {},
	// 	interviewers: {}
	// });

	// const setDay = (day) => setState((prev) => ({...prev, day}));
	// const setDays = (days) => setState((prev) => ({...prev, days}));
	// const setAppointments = (appointments) => setState((prev) => ({...prev, appointments}));
	// const setInterviewers = (interviewers) => setState((prev) => ({...prev, interviewers}));

	// useEffect(() => {
	// 	Promise.all([
	// 		axios.get(`http://localhost:3001/api/days`),
	// 		axios.get(`http://localhost:3001/api/appointments`),
	// 		axios.get(`http://localhost:3001/api/interviewers`)
	// 	])
	// 		.then((response) => {
	// 			const renderState = {
	// 				day: state.day,
	// 				days: response[0].data,
	// 				appointments: response[1].data,
	// 				interviewers: response[2].data
	// 			};
	// 			setState(renderState);
	// 		})
	// 		.catch((err) => console.log('Error message :', err));
	// }, [state.day]);

	const appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);

	// //pass the bookInterview action each Appointment component
	// const bookInterview = (id, interview) => {
	// 	const appointment = {
	// 		...state.appointments[id],
	// 		interview: {...interview}
	// 	};
	// 	const appointments = {
	// 		...state.appointments,
	// 		[id]: appointment
	// 	};
	// 	console.log('BOOKINTERVIEW ID:', id);
	// 	console.log('BOOKINTERVIEW interview:', interview);
	// 	return axios.put(`http://localhost:3001/api/appointments/${id}`, {interview}).then((res) => {
	// 		setState({...state, appointments: appointments});
	// 		return res;
	// 	});
	// 	// .catch((err) => {
	// 	// 	console.log('error:', err);
	// 	// });

	// 	// console.log(id, interview);
	// };

	// const deleteInterview = (id, interview) => {
	// 	const appointment = {
	// 		...state.appointments[id],
	// 		interview: null
	// 	};
	// 	const appointments = {
	// 		...state.appointments,
	// 		[id]: appointment
	// 	};
	// 	console.log('BOOKINTERVIEW ID:', id);
	// 	console.log('BOOKINTERVIEW interview:', interview);
	// 	return axios.delete(`http://localhost:3001/api/appointments/${id}`, {interview}).then((res) => {
	// 		setState({...state, appointments: appointments});
	// 		return res;
	// 	});
	// 	// .catch((err) => {
	// 	// 	console.log(err);
	// 	// });

	// 	// console.log(id, interview);
	// };

	// // *****
	// console.log('STATE HERE', state);
	// console.log('STATE DAY HERE', state.day);
	// console.log('INTERVIEWERS HERE', interviewers);
	// // *****
	const schedule = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		console.log('appointment!!!!!!!!!:', appointment);
		console.log('interview!!!!!!!!!', interview);
		return (
			<Appointment
				key={appointment.id}
				{...appointment}
				interviewData={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
				deleteInterview={deleteInterview}
			/>
		);
	});
	return (
		<main className="layout">
			<section className="sidebar">
				<img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
				<hr className="sidebar__separator sidebar--centered" />
				<DayList days={state.days} day={state.day} setDay={setDay} />
				<nav className="sidebar__menu" />
				<img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />{' '}
			</section>
			<section className="schedule">{schedule}</section>
		</main>
	);
}
