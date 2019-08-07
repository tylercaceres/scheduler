import React from 'react';

// The Show component should accept the following props:

// student:String eg. "Lydia Miller-Jones"
// interviewer:Object eg. { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" }
// onEdit:Function to be called when the user clicks the Edit button
// onDelete:Function to be called when the user clicks the Delete button

const Show = (props) => {
	return (
		<main class="appointment__card appointment__card--show">
			<section class="appointment__card-left">
				<h2 class="text--regular">{props.student}</h2>
				<section class="interviewer">
					<h4 class="text--light">Interviewer</h4>
					<h3 class="text--regular">{props.interviewer.name}</h3>
				</section>
			</section>
			<section class="appointment__card-right">
				<section class="appointment__actions">
					<img class="appointment__actions-button" src="images/edit.png" alt="Edit" onClick={props.onEdit} />
					<img class="appointment__actions-button" src="images/trash.png" alt="Delete" onClick={props.onDelete} />
				</section>
			</section>
		</main>
	);
};

export default Show;
