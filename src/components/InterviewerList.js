import React from 'react';
import InterviewerListItem from './InterviewerListItem';

import './InterviewerList.scss';

function InterviewerList(props) {
	{
		console.log('I AM HEREEEEEEE', props.interviewers);
	}
	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">{props.name}</h4>
			<ul className="interviewers__list">
				{props.interviewers.map((interviewer) => {
					return (
						<InterviewerListItem
							key={interviewer.id}
							id={interviewer.id}
							name={interviewer.name}
							avatar={interviewer.avatar}
							selected={interviewer.id === props.value}
							setInterviewer={() => props.onChange(interviewer.id)}
						/>
					);
				})}
			</ul>
		</section>
	);
}

export default InterviewerList;
