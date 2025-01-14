import React from 'react';

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	queryByText,
	prettyDOM,
	getByDisplayValue,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	waitForElementToBeRemoved
} from '@testing-library/react';

import Application from 'components/Application';
import axios from 'axios';
afterEach(cleanup);

describe('application', () => {
	it('renders without crashing', () => {
		render(<Application />);
	});

	it('changes the schedule when a new day is selected', async () => {
		const {getByText} = render(<Application />);
		await waitForElement(() => getByText('Monday'));
		fireEvent.click(getByText('Tuesday'));
		expect(getByText('Leopold Silvers')).toBeInTheDocument();
	});

	// it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
	// 	const {container} = render(<Application />);
	// 	await waitForElement(() => getByText(container, 'Archie Cohen'));
	// 	const appointment = getAllByTestId(container, 'appointment')[0];
	// 	fireEvent.click(getByAltText(appointment, 'Add'));
	// 	fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
	// 		target: {value: 'Lydia Miller-Jones'}
	// 	});
	// 	fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
	// 	fireEvent.click(getByText(appointment, 'Save'));
	// 	expect(getByText(appointment, 'Saving...'));
	// 	await waitForElementToBeRemoved(() => getByText(appointment, 'Saving...'));
	// 	const day = getAllByTestId(container, 'day').find((currDay) => queryByText(currDay, 'Monday'));
	// 	expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
	// });
});
