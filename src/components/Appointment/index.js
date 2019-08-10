import React, {useState, useEffect} from 'react';
import './styles.scss';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import Form from './Form';

const useVisualMode = require('hooks/useVisualMode');

const Appointment = (props) => {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CONFIRM = 'CONFIRM';
	const STATUS = 'STATUS';
	const ERROR = 'ERROR';
	const CREATE = 'CREATE';
	const EDIT = 'EDIT';

	const [mode, setMode] = useVisualMode(EMPTY);

	return (
		<article>
			<Header time={props.time} />
			{props.mode === 'EMPTY' && <Empty onAdd={props.onAdd} />}
			{props.mode === 'SHOW' && props.interview && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={props.onEdit}
					onDelete={props.onDelete}
				/>
			)}
			{props.mode === 'CONFIRM' && (
				<Confirm message={props.message} onConfirm={props.onConfirm} onCancel={props.onCancel} />
			)}
			{props.mode === 'STATUS' && <Status message={props.message} />}
			{props.mode === 'ERROR' && <Error message={props.message} onClose={props.onClose} />}
			{props.mode === 'CREATE' && (
				<Form interviewers={props.interviewers} onSave={props.onSave} onCancel={props.onCancel} />
			)}
			{props.mode === 'EDIT' && (
				<Form
					name="The God One"
					interviewers={props.interviewers}
					interviewer={props.interviewer}
					onSave={props.onSave}
					onCancel={props.onCancel}
				/>
			)}
		</article>
	);
};

export default Appointment;
