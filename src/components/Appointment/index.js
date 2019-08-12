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
	const SAVING = 'SAVING';
	const DELETING = 'DELETING';
	const ERROR = 'ERROR';
	const CREATE = 'CREATE';
	const EDIT = 'EDIT';
	const ERROR_SAVE = 'ERROR_SAVE';
	const ERROR_DELETE = 'ERROR_DELETE';

	const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

	//pass this to the form component. We pass this function to the Form component. The Form captures the name and interviewer and passes them to props.onSave as arguments
	const save = (name, interviewer) => {
		console.log('name:', name);
		console.log('interviewer:', interviewer);
	};
	console.log('PROPS ON FORM:', props);

	function generateInterview(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		return interview;
	}
	// useEffect(() => {
	// 	if (props.interview && mode === EMPTY) {
	// 		transition(SHOW);
	// 	}
	// 	if (props.interview === null && mode === SHOW) {
	// 		transition(EMPTY);
	// 	}
	// }, [props.interview, mode, transition]);
	console.log('PROPS TO DETERMINE INTERVIEWER NAME', props);

	return (
		<article>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && props.interview && (
				<Show
					{...props}
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => {
						transition(EDIT);
					}}
					onDelete={() => {
						transition(CONFIRM);
					}}
				/>
			)}
			{console.log('propssssss:', props)}
			{mode === CONFIRM && (
				<Confirm
					message="Are you sure you want to delete this?"
					onConfirm={(name, interviewer) => {
						transition(DELETING, true);
						props
							.deleteInterview(props.id, generateInterview(name, interviewer))
							.then(() => transition(EMPTY))
							.catch(() => transition(ERROR_DELETE, true));
					}}
					onCancel={props.onCancel}
				/>
			)}
			{mode === DELETING && <Status message="Deleting..." />}
			{mode === SAVING && <Status message="Saving..." />}
			{mode === ERROR && <Error message={props.message} onClose={props.onClose} />}
			{mode === ERROR_SAVE && <Error message="Error saving." onClose={back} />}
			{mode === ERROR_DELETE && <Error message="Error Deleting." onClose={back} />}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={(name, interviewer) => {
						console.log('I AM HERE NAME', name);
						console.log('I AM HERE INTERVIEWER', interviewer);
						transition(SAVING);
						props
							.bookInterview(props.id, generateInterview(name, interviewer))
							.then(() => transition(SHOW))
							.catch(() => transition(ERROR_SAVE, true));
					}}
					onCancel={back}
				/>
			)}
			{mode === 'EDIT' && (
				<Form
					name={props.interview.student}
					interviewer={props.interview.interviewer}
					interviewers={props.interviewers}
					// interviewer={props.interviewer}
					onSave={(name, interviewer) => {
						console.log('I AM HERE NAME', name);
						console.log('I AM HERE INTERVIEWER', interviewer);
						props
							.bookInterview(props.id, generateInterview(name, interviewer))
							.then(() => transition(SHOW))
							.catch(() => transition(ERROR_SAVE));
					}}
					onCancel={back}
				/>
			)}
		</article>
	);
};

export default Appointment;
