import React, {useState, useEffect} from 'react';
import './styles.scss';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import Form from './Form';

import useVisualMode from 'hooks/useVisualMode';

const Appointment = (props) => {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CONFIRM = 'CONFIRM';
	const STATUS = 'STATUS';
	const ERROR = 'ERROR';
	const CREATE = 'CREATE';
	const EDIT = 'EDIT';

	const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

	// useEffect(() => {
	// 	if (props.interview && mode === EMPTY) {
	// 		transition(SHOW);
	// 	}
	// 	if (props.interview === null && mode === SHOW) {
	// 		transition(EMPTY);
	// 	}
	// }, [props.interview, mode, transition]);

	return (
		<article>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && props.interview && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={props.onEdit}
					onDelete={props.onDelete}
				/>
			)}
			{console.log('propssssss:', props)}
			{mode === 'CONFIRM' && <Confirm message={props.message} onConfirm={props.onConfirm} onCancel={props.onCancel} />}
			{mode === 'STATUS' && <Status message={props.message} />}
			{mode === 'ERROR' && <Error message={props.message} onClose={props.onClose} />}
			{mode === 'CREATE' && <Form interviewers={props.interviewers} onSave={props.onSave} onCancel={back} />}
			{/* {mode === 'CREATE' && <Form interviewers={props.interviewers} onSave={props.onSave} onCancel={props.onCancel} />} */}
			{mode === 'EDIT' && (
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
