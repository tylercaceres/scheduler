import React from 'react';

// The Show component should accept the following props:

// student:String eg. "Lydia Miller-Jones"
// interviewer:Object eg. { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" }
// onEdit:Function to be called when the user clicks the Edit button
// onDelete:Function to be called when the user clicks the Delete button

const Show = (props) => {
	console.log('TRYING TO FIND OUT WHY NAME IS NOT SHOWING UP', props);
	return (
		<main className="appointment__card appointment__card--show">
			<section className="appointment__card-left">
				<h2 className="text--regular">{props.student}</h2>
				<section className="interviewer">
					<h4 className="text--light">Interviewer</h4>
					<h3 className="text--regular">{props.interviewData.interviewer.name}</h3>
				</section>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<img className="appointment__actions-button" src="images/edit.png" alt="Edit" onClick={props.onEdit} />
					<img className="appointment__actions-button" src="images/trash.png" alt="Delete" onClick={props.onDelete} />
				</section>
			</section>
		</main>
	);
};

export default Show;
