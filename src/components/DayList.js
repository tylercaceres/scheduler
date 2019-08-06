import React from 'react';
import DayListItem from './DayListItem';

// days:Array a list of day objects
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

export default function DayList(props) {
	return (
		<ul>
			{props.days.map((day) => (
				<DayListItem
					name={day.name}
					spots={day.spots}
					key={day.id}
					selected={day.name === props.day}
					setDay={props.setDay}
				/>
			))}
		</ul>
	);
}
