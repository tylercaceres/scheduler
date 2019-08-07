import React, {useState} from 'react';
import Button from './Button';
import DayList from './DayList';
import {action} from '@storybook/addon-actions';
import InterviewList from './InterviewerList';

import 'components/Application.scss';

const days = [
	{
		id: 1,
		name: 'Monday',
		spots: 2
	},
	{
		id: 2,
		name: 'Tuesday',
		spots: 5
	},
	{
		id: 3,
		name: 'Wednesday',
		spots: 0
	}
];

export default function Application(props) {
	const [currDay, setCurrDay] = useState('Monday');
	const [currInterviewer, setCurrInterviewer] = useState('');

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
				<Button danger onClick={action('button-clicked')}>
					Disabled
				</Button>
			</section>
		</main>
	);
}
