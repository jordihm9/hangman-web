import React, { useState, useEffect, Fragment } from 'react';

import Button from './components/Button';
import Hangman from './components/Hangman';
import Keyboard from './components/Keyboard';
import Guess from './components/Guess';

const App = () => {
	const [ word, setWord ] = useState(null);
	const [ guess, setGuess ] = useState(null);
	const [ failures, setFailures ] = useState(0); // max 10
	const [ keys, setKeys ] = useState(() => resetKeys());
	// enum: FETCHING_WORD, PLAYING, GUESSED, HANGED
	const [ state, setState ] = useState('FETCHING_WORD');

	useEffect(() => {
		const newWord = fetchNewWord();
		setWord(newWord);
		setGuess([...newWord].fill(''));
		setState('PLAYING');
	}, []); // same as componentDidMount from class components

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
				console.log('hanged!');
				break;
			case 'GUESSED':
				console.log('guessed!');
				break;
			default:
				return;
		}
	}, [ state ]);

	/**
	 * ToDo
	 * Send a request to https://random-word-api.heroku.com/word via **GET**
	 * API: https://random-word-api.heroku.com/word
	 * headers: content-type = 'application/json'
	 * @return {array} new word with all the letters separed and in uppercase
	 */
	function fetchNewWord() {
		setState('FETCHING_WORD')
		return 'HANGMAN'.split('');
	}

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
		setFailures(0);
		fetchNewWord();
		setKeys(resetKeys());
		setState('PLAYING');
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

	return (
		<Fragment>
			<div className="title text-center">
				<h1>Hangman</h1>
			</div>
			{ word ?
					<Fragment>
						<Hangman failures={failures}/>
						<Guess guess={guess} />
					</Fragment>
				: null
			}
			<Keyboard keys={keys} guessLetter={guessLetter} />
			{ word ? <Button action={reset}>Reset</Button> : null }
		</Fragment>
	);
}

export default App;
