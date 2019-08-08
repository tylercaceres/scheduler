import React, {useState, useEffect} from 'react';
import Button from './Button';
import DayList from './DayList';
import Appointment from './Appointment/index';
import axios from 'axios';

import 'components/Application.scss';

const appointments = [
	{
		id: 1,
		time: '12pm'
	},
	{
		id: 2,
		time: '1pm',
		interview: {
			student: 'Lydia Miller-Jones',
			interviewer: {
				id: 1,
				name: 'Sylvia Palmer',
				avatar: 'https://i.imgur.com/LpaY82x.png'
			}
		}
	},
	{
		id: 3,
		time: '3pm',
		interview: {
			student: 'Trunks Briefs',
			interviewer: {
				id: 5,
				name: 'Sven Jones',
				avatar: 'https://i.imgur.com/twYrpay.jpg'
			}
		}
	},
	{
		id: 4,
		time: '2pm',
		interview: {
			student: 'Son Goku',
			interviewer: {
				id: 3,
				name: 'Mildred Nazir',
				avatar: 'https://i.imgur.com/T2WwVfS.png'
			}
		}
	},
	{
		id: 5,
		time: '4pm',
		interview: {
			student: 'Perfect Cell',
			interviewer: {
				id: 2,
				name: 'Tori Malcolm',
				avatar: 'https://i.imgur.com/Nmx0Qxo.png'
			}
		}
	}
];

export default function Application(props) {
	const [currDay, setCurrDay] = useState('Monday');
	const [currInterviewer, setCurrInterviewer] = useState('');
	const [days, setDays] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:3001/api/days`).then((response) => setDays(response.data));
	}, []);

	const appointmentList = appointments.map((appointment) => {
		return <Appointment key={appointment.id} {...appointment} mode={appointment.interview ? 'SHOW' : 'EMPTY'} />;
	});
	return (
		<main className="layout">
			<section className="sidebar">
				<img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
				<hr className="sidebar__separator sidebar--centered" />
				<DayList days={days} day={currDay} setDay={setCurrDay} />
				<nav className="sidebar__menu" />
				<img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />{' '}
			</section>
			<section className="schedule">
				{appointmentList}
				<Appointment mode="EMPTY" key="last" time="5pm" />
			</section>
		</main>
	);
}
