import React from 'react';
import classnames from 'classnames';

import 'components/InterviewerListItem.scss';

function InterviewerListItem(props) {
	const liInterviewerListItemClass = classnames('interviewers__item', {
		'interviewers__item--selected': props.selected
	});

	return (
		<li className={liInterviewerListItemClass} onClick={props.setInterviewer}>
			<img className="interviewers__item-image" src={props.avatar} alt={props.name} />
			{props.selected ? props.name : ''}
		</li>
	);
}

export default InterviewerListItem;
