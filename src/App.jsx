import React, { useState, useEffect, Fragment } from 'react';

import getRandomWord from './services/getRandomWord';

import Button from './components/Button';
import Hangman from './components/Hangman';
import Keyboard from './components/Keyboard';
import Guess from './components/Guess';

const App = () => {
	const [ word, setWord ] = useState(null);
	const [ guess, setGuess ] = useState(null);
	const [ failures, setFailures ] = useState(0); // max 10
	const [ keys, setKeys ] = useState(() => resetKeys());
	// enum: LOADING, PLAYING, GUESSED, HANGED
	const [ state, setState ] = useState('LOADING');

	useEffect(() => {
		newWord();
	}, []); // same as componentDidMount from class components

	useEffect(() => {
		if (word) {
			setGuess([...word].fill(''));
			setState('PLAYING');
		}
	}, [ word ]);
	
	useEffect(() => {
		if (word && guess) {
			if (guess.join('') === word.join('')) {
				setState('GUESSED');
			}
		}
	}, [ guess ]); // eslint-disable-line

	useEffect(() => {
		if (failures >= 10) {
			setState('HANGED');
		}
	}, [ failures ]);

	useEffect(() => {
		switch (state) {
			case 'HANGED':
				alert('hanged!');
				break;
			case 'GUESSED':
				alert('guessed!');
				break;
			default:
				return;
		}
	}, [ state ]);

	/**
	 * Updates the keys list setting it has been used
	 * Checks if the word has the letter received and updates the guess
	 * Checks if the guess is complete comparing with the original word
	 * @param {string} letter in uppercase
	 */
	function guessLetter(letter) {
		if (state !== 'PLAYING') return;

		// update the keyboard
		setKeys(keys.reduce((acc, l) => {
			if (l.letter === letter) {
				acc.push({
					...l,
					'inWord': word.includes(letter),
					'used': true
				});
			} else {
				acc.push(l);
			}
			return acc;
		}, []));

		// checks if the word has the letter
		if (!word.includes(letter)) {
			fail();
		} else {
			setGuess(guess.map((val, index) => letter === word[index] ? letter : val));
		}
	}

	/**
	 * Increase number of failures
	 */
	function fail() {
		setFailures(failures + 1);
	}

	/**
	 * Resets the failures to 0, fetches a new word and reset the keys
	 */
	function reset() {
		newWord();
		setFailures(0);
		setKeys(resetKeys());
	}
	
	/**
	 * Restore the keys array and its properties and setting if the letter is in the word
	 * @returns {array} keys
	 */
	function resetKeys() {
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

		return alphabet.reduce((acc, l) => {
			acc.push({
				'letter': l,
				'inWord': false,
				'used': false
			});

			return acc;
		}, []);
	}

	function newWord() {
		setState('LOADING');

		getRandomWord()
			.then(newWord => {
				setWord(newWord);
			});
	}

	return (
		<Fragment>
			<div className="title text-center">
				<h1>Hangman</h1>
			</div>
			{ word && guess ?
					<Fragment>
						<Hangman failures={failures}/>
						<Guess guess={guess} />
						<Keyboard keys={keys} guessLetter={guessLetter} />
						<Button action={reset}>Reset</Button>
					</Fragment>
				: state === 'LOADING' ?
					<h2>LOADING</h2>
				: null
			}
			{
				state === 'GUESSED' ?
					<h2>GUESSED</h2>
					: state === 'HANGED' ?
					<h2>HANGED</h2>
					: null
			}
		</Fragment>
	);
}

export default App;
