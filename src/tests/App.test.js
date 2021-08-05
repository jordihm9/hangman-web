import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './../App';

describe('<App />', () => {
	beforeEach(() => render(<App initialWord={'HELLO'.split('')} />));

	test('should render', () => {
		screen.getByRole('heading', { 'title': /hangman/i });
	});

	// ToDo
	// test('should render a popup when it has been hanged', () => {
	// 	const tmp = 'QWRTYUIPASD'.split('');

	// 	// fake 10 clicks diferent letters that the word doesn't include
	// 	for (const l of tmp) {
	// 		fireEvent.click(screen.getByText(l));
	// 	}
	// });

	// ToDo
	// test('should render a popup when the word is guessed', () => {
	// 	const tmp = 'HELO'.split('');

	// 	// fake clicks to the letters that the word contains to complete
	// 	for (const l of tmp) {
	// 		fireEvent.click(screen.getByText(l));
	// 	}
	// });

	// ToDo
	// test('reset button is clicked', () => {
	// 	fireEvent.click(screen.getByText(/reset/i));
	// });
});
