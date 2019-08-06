import React from 'react';
import classnames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
	const dayListItemClass = classnames('day-list__item', {
		'day-list__item--selected': props.selected,
		'day-list__item--full': props.spots === 0
	});

	return (
		<div className={dayListItemClass} onClick={() => props.setDay(props.name)}>
			<h3>
				<strong>{props.name}</strong>
			</h3>
			{props.spots ? props.spots : 'no '} spot{props.spots === 1 ? '' : 's'} remaining
		</div>
	);
}
