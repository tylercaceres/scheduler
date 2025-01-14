import React from 'react';
import DayList from './DayList';
import Appointment from './Appointment/index';

import 'components/Application.scss';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
	const {state, setDay, bookInterview, deleteInterview} = useApplicationData();

	const appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);

	const schedule = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
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
