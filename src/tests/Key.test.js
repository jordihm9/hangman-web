import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Key from './../components/Key';

describe('<Key />', () => {
	let letter = {
		'letter': 'A',
		'inWord': false,
		'used': false
	};

	let mockGuessLetter;

	beforeEach(() => {
		mockGuessLetter = jest.fn();
		
		render(<Key letter={letter} guessLetter={mockGuessLetter} />);
	});

	test('should render', () => {
		screen.getByText('A');
	});
	
	test('should run the guessLetter function when the key it\'s clicked', () => {
		fireEvent.click(screen.getByText('A'));

		expect(mockGuessLetter).toHaveBeenCalledTimes(1);
	});

	test('should prevent running the guessLetter function if the key has been clicked before', () => {
		letter.used = true;
		
		fireEvent.click(screen.getByText('A'));

		expect(mockGuessLetter).toHaveBeenCalledTimes(0);
	});
});