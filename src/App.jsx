import React, { Fragment } from 'react';

import HangmanGame from './utils/HangmanGame';

import Button from './components/Button';
import Hangman from './components/Hangman';
import Keyboard from './components/Keyboard';
import Guess from './components/Guess';
import PopUp from './components/PopUp';
import Spinner from './components/Spinner';

import useEvent from './hooks/useEvent';

const App = () => {
	useEvent('keydown', keypressHandler);

	const {
		word, guess, failures, keys, state,
		guessLetter, reset
	 } = HangmanGame();

	function keypressHandler(ev) {
		console.log(ev);
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

		if (alphabet.includes(ev.key.toUpperCase())) {
			guessLetter(ev.key.toUpperCase());
		}
	}

	return (
		<Fragment>
			<div className="title text-center">
				<h1>Hangman</h1>
			</div>
			{
				state === 'LOADING' ?
					<Spinner />
				: word && guess &&
					<Fragment>
						<Hangman failures={failures}/>
						<Guess guess={guess} />
						<Keyboard keys={keys} guessLetter={guessLetter} />
						<Button action={reset}>New word</Button>
					</Fragment>
			}
			{
				state === 'GUESSED' ?
					<PopUp
						msg="You guessed it!"
						word={word}
						buttonText="Play again"
						buttonAction={reset}
					/>
				: state === 'HANGED' &&
					<PopUp
						msg="You've been hanged!"
						word={word}
						buttonText="Play again"
						buttonAction={reset}
					/>
			}
		</Fragment>
	);
}

export default App;
