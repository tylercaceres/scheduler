import React, {useState} from 'react';
import './styles.scss';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';

const Appointment = (props) => {
	// const [mode, setMode] = useState('EMPTY');

	return (
		<article>
			<Header time={props.time} />
			{props.mode === 'EMPTY' && <Empty onAdd={props.onAdd} />}
			{props.mode === 'SHOW' && (
				<Show student={props.student} interviewer={props.interviewer} onEdit={props.onEdit} onDelete={props.onDelete} />
			)}
			{props.mode === 'CONFIRM' && (
				<Confirm message={props.message} onConfirm={props.onConfirm} onCancel={props.onCancel} />
			)}
		</article>
	);
};

export default Appointment;
