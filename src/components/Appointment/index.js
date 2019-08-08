import React, {useState} from 'react';
import './styles.scss';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import Form from './Form';

const Appointment = (props) => {
	// const [mode, setMode] = useState('EMPTY');
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
