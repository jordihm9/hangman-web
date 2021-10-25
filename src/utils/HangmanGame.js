import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import getRandomWord from './../services/getRandomWord';

const HangmanGame = () => {
	const [ word, setWord ] = useState(null);
	const [ guess, setGuess ] = useState(null);
	const [ failures, setFailures ] = useState(0); // max 10
	const [ keys, setKeys ] = useState(() => resetKeys());
	// enum: LOADING, PLAYING, GUESSED, HANGED
	const [ state, setState ] = useState('LOADING');

	useEffect(() => {
		newWord();
		// eslint-disable-next-line
	}, []); // same as componentDidMount from class components

	useEffect(() => {
		if (word) {
			setGuess(
				[...word].reduce((acc, letter) => {
					acc.push({
						letter: '',
						id: uuidv4()
					});
					return acc;
				}, [])
			);

			// always wait some miliseconds before changing the state back to PLAYING
			// so the spinner shows up to let know the user the app is
			// working to load a different word
			// !! no more than 500ms because it would notice the app is too slow !!
			setTimeout(() => setState('PLAYING'), 250);
		}
	}, [ word ]);
	
	useEffect(() => {
		if (word && guess) {
			const wordStr = word.join('');
			const guessStr = guess.reduce((str, letter) => str += letter.letter, '');

			guessStr === wordStr && setState('GUESSED'); 
		}
	}, [ guess ]); // eslint-disable-line

	useEffect(() => {
		if (failures >= 10) {
			setState('HANGED');
		}
	}, [ failures ]);

	/**
	 * Updates the keys list setting it has been used
	 * Checks if the word has the letter received and updates the guess
	 * Checks if the guess is complete comparing with the original word
	 * @param {string} letter in uppercase
	 */
	function guessLetter(letter) {
		// if (state !== 'PLAYING') return;

		// update the keyboard
		setKeys(keys.reduce((acc, l) => {
			acc.push(
				l.letter === letter ?
				{ ...l,
					'inWord': word.includes(letter),
					'used': true
				}
				: l
			);
			return acc;
		}, []));

		// checks if the word has the letter
		if (!word.includes(letter)) {
			fail();
		} else {
			setGuess(
				guess.reduce((acc, val, index) => {
					acc.push(
						letter === word[index] ?
						{ ...val,
							'letter': letter
						}
						: val
					);
					return acc;
				}, [])
			);
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
				'inWord': null,
				'used': false
			});

			return acc;
		}, []);
	}

	/**
	 * Changes the state to loading and sends a request to get a new word
	 */
	function newWord() {
		setState('LOADING');

		getRandomWord()
			.then(newWord => {
				setWord(newWord);
		});
	}

	return {
		word, setWord,
		guess,
		failures,
		keys,
		state,
		guessLetter,
		reset,
		newWord
	}
}

export default HangmanGame;
