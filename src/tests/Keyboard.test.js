import React from 'react';
import { render, screen } from '@testing-library/react';

import Keyboard from './../components/Keyboard';

describe('<Keyboard />', () => {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXY'.split('');
	let keys;

	beforeEach(() => {
		keys = alphabet.reduce((acc, letter) => {
			acc.push({
				'letter': letter,
				'inWord': false,
				'used': false
			});

			return acc;
		}, []);
	});

	test('should render the whole keyboard with each key from the alphabet', () => {
		render(<Keyboard keys={keys} />);

		for (const letter of alphabet) {
			screen.getByText(letter);
		}
	});
});