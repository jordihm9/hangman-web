import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from './../components/Button';

describe('<Button />', ()=> {

	test('should render', () => {
		render(<Button>I am a button!</Button>);

		screen.getByRole('button');
		screen.getByText('I am a button!');
	});

	test('should run the function passed by props when click is fired', () => {
		const mockFunction = jest.fn();

		render(<Button action={mockFunction}>Click me!</Button>);

		fireEvent.click(screen.getByRole('button'));

		expect(mockFunction).toHaveBeenCalledTimes(1);
	});
});