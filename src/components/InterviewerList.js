import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

import './InterviewerList.scss';

function InterviewerList(props) {
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

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default InterviewerList;


