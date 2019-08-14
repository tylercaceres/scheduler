import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import 'index.scss';

import Button from 'components/Button';
import DayListItem from 'components/DayListItem';
import DayList from 'components/DayList';
import InterviewerListItem from 'components/InterviewerListItem';
import InterviewerList from 'components/InterviewerList';

import Appointment from 'components/Appointment/index';

storiesOf('Button', module)
	.addParameters({
		backgrounds: [{name: 'dark', value: '#222f3e', default: true}]
	})
	.add('Base', () => <Button>Base</Button>)
	.add('Confirm', () => <Button confirm>Confirm</Button>)
	.add('Danger', () => <Button danger>Cancel</Button>)
	.add('Clickable', () => <Button onClick={action('button-clicked')}>Clickable</Button>)
	.add('Disabled', () => (
		<Button disabled onClick={action('button-clicked')}>
			Disabled
		</Button>
	));

storiesOf('DayListItem', module)
	.addParameters({
		backgrounds: [{name: 'dark', value: '#222f3e', default: true}]
	})
	.add('Unselected', () => <DayListItem name="Monday" spots={5} />)
	.add('Selected', () => <DayListItem name="Monday" spots={5} selected />)
	.add('Full', () => <DayListItem name="Monday" spots={0} />)
	.add('Clickable', () => <DayListItem name="Tuesday" setDay={action('setDay')} spots={5} />);

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

storiesOf('DayList', module)
	.addParameters({
		backgrounds: [{name: 'dark', value: '#222f3e', default: true}]
	})
	.add('Monday', () => <DayList days={days} day={'Monday'} setDay={action('setDay')} />)
	.add('Tuesday', () => <DayList days={days} day={'Tuesday'} setDay={action('setDay')} />);

const interviewer = {
	id: 1,
	name: 'Sylvia Palmer',
	avatar: 'https://i.imgur.com/LpaY82x.png'
};

storiesOf('InterviewerListItem', module)
	.addParameters({
		backgrounds: [{name: 'dark', value: '#222f3e', default: true}]
	})
	.add('Unselected', () => (
		<InterviewerListItem id={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} />
	))
	.add('Selected', () => (
		<InterviewerListItem id={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} selected />
	))
	.add('Clickable', () => (
		<InterviewerListItem
			id={interviewer.id}
			name={interviewer.name}
			avatar={interviewer.avatar}
			setInterviewer={(event) => action('setInterviewer')(interviewer.id)}
		/>
	));

const interviewers = [
	{id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png'},
	{id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png'},
	{id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png'},
	{id: 4, name: 'Cohana Roy', avatar: 'https://i.imgur.com/FK8V841.jpg'},
	{id: 5, name: 'Sven Jones', avatar: 'https://i.imgur.com/twYrpay.jpg'}
];

storiesOf('InterviewerList', module)
	.addParameters({
		backgrounds: [{name: 'dark', value: '#222f3e', default: true}]
	})
	.add('Initial', () => <InterviewerList interviewers={interviewers} onChange={action('setInterviewer')} />)
	.add('Preselected', () => (
		<InterviewerList interviewers={interviewers} value={3} onChange={action('setInterviewer')} />
	));

const appointments = {
	time: '12pm',
	student: 'Lydia Miller-Jones',
	interviewer: {id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png'}
};

storiesOf('Appointment', module)
	.addParameters({
		backgrounds: [{name: 'white', value: '#fff', default: true}]
	})
	//header
	.add('Appointment', () => <Appointment />)
	.add('Header', () => <Appointment time={appointments.time} />)
	//empty
	.add('Empty', () => <Appointment mode="EMPTY" onAdd={action('addAppointment')} />)
	//show
	.add('Show', () => (
		<Appointment
			mode="SHOW"
			interview={appointments}
			onEdit={action('editAppointment')}
			onDelete={action('deleteAppointment')}
		/>
	))
	.add('Confirm', () => (
		<Appointment
			mode="CONFIRM"
			message="Delete the appointment?"
			onConfirm={action('confirm')}
			onCancel={action('cancel')}
		/>
	))
	.add('Status', () => <Appointment mode="STATUS" message="Deleting" />)
	.add('Error Saving', () => (
		<Appointment mode="ERROR_SAVE" message="Could not save appointment." onClose={action('error')} />
	))
	.add('Error Deleting', () => (
		<Appointment mode="ERROR_DELETE" message="Could not delete appointment." onClose={action('error')} />
	))
	.add('Create', () => (
		<Appointment mode="CREATE" interviewers={interviewers} onSave={action('onSave')} onCancel={action('onCancel')} />
	))
	.add('Edit', () => (
		<Appointment
			mode="EDIT"
			name="Tyler Caceres"
			interviewers={interviewers}
			interviewer={3}
			onSave={action('onSave')}
			onCancel={action('onCancel')}
		/>
	))
	.add('Appointment Empty', () => (
		<>
			<Appointment mode="EMPTY" id={1} time="12pm" />
			<Appointment mode="EMPTY" id="last" time="1pm" />
		</>
	))
	.add('Appointment Booked', () => (
		<>
			<Appointment mode="SHOW" id={1} time="12pm" interviewer={{student: 'Lydia Miller-Jones', interviewer}} />
			<Appointment mode="SHOW" id="last" time="1pm" />
		</>
	));
