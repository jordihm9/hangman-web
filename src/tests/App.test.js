import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import App from './../App';

describe('<App />', () => {
	beforeEach(() => render(<App initialWord={'HELLO'.split('')} />));

	test('should render', () => {
		screen.getByRole('heading', { 'title': /hangman/i });
	});

	test('check if the word contains a letter and render the guess with the letter if the word includes it', () => {
		const wordContainer = document.querySelector('.guess');

		fireEvent.click(screen.getByText('A'));
		expect(within(wordContainer).queryAllByText('A')).toHaveLength(0);

		fireEvent.click(screen.getByText('L'));
		expect(within(wordContainer).queryAllByText('L')).toHaveLength(2);
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
