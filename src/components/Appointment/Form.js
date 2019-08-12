import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = (props) => {
	const [studentName, setStudentName] = useState(props.name || '');
	const [interviewerId, setInterviewerId] = useState(props.interviewer || null);
	const reset = () => {
		setStudentName('');
		setInterviewerId(null);
		props.onCancel();
	};

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						onChange={(event) => setStudentName(event.target.value)}
						value={studentName}
					/>
				</form>
				<InterviewerList interviewers={props.interviewers} value={interviewerId} onChange={setInterviewerId} />
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={reset}>
						Cancel
					</Button>
					<Button confirm onClick={() => props.onSave(studentName, interviewerId)}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
};

export default Form;
