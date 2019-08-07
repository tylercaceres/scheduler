import React from 'react';

// The Header component should accept the following props:
// time:String eg. "12pm"

const Header = (props) => {
	return (
		<header className="appointment__time">
			<h4 className="text--semi-bold">{props.time}</h4>
			<hr className="appointment__separator" />
		</header>
	);
};

export default Header;
