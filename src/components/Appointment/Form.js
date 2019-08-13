import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = (props) => {
	const [studentName, setStudentName] = useState(props.name || '');
	const [interviewerId, setInterviewerId] = useState(props.interviewer || null);
	const [error, setError] = useState('');
	const reset = () => {
		setStudentName('');
		setInterviewerId(null);
		props.onCancel();
	};
	const validate = () => {
		if (studentName === '') {
			setError('Student name cannot be blank');
			return;
		}
		setError('');
		props.onSave(studentName, interviewerId);
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
						data-testid="student-name-input"
					/>
					<section className="appointment__validation">{error}</section>
				</form>
				<InterviewerList interviewers={props.interviewers} value={interviewerId} onChange={setInterviewerId} />
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={reset}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
};

export default Form;
