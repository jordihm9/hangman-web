import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './../App';

describe('<App />', () => {
	test('should render', () => {
		render(<App />);

		screen.getByText('Hangman');
	});
});
