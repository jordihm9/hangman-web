import React, { useState, useEffect, Fragment } from 'react';

import Button from './components/Button';
import Hangman from './components/Hangman';
import Keyboard from './components/Keyboard';
import Guess from './components/Guess';

const App = ({ initialWord = ['H', 'E', 'L', 'L', 'O']}) => {
	const [ word, setWord ] = useState(initialWord);
	const [ guess, setGuess ] = useState([...word].fill(''));
	const [ failures, setFailures ] = useState(0); // max 10
	const [ keys, setKeys ] = useState(() => resetKeys());
	const [ state, setState ] = useState('PLAYING'); // enum: PLAYING, GUESSED, HANGED

	useEffect(() => {
		setGuess([...word].fill('')); // make a copy of word filling with empty strings
	}, [ word ]);

	useEffect(() => {
		if (guess.join('') === word.join('')) {
			setState('GUESSED');
		}
	}, [ guess, word ]);

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
	 * Request using axios to https://random-word-api.heroku.com/word via **GET**
	 * Get the word returned and store it in uppercase as array in the word state using setWord()
	 * API: https://random-word-api.heroku.com/word
	 * headers: content-type = 'application/json'
	 */
	function fetchNewWord() {
		setWord('HELLO'.split(''));
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
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXY'.split('');

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
			<h1>Hangman</h1>
			<Hangman failures={failures}/>
			<Guess guess={guess} />
			<Keyboard keys={keys} guessLetter={guessLetter} />
			<Button action={reset}>Reset</Button>
		</Fragment>
	);
}

export default App;
