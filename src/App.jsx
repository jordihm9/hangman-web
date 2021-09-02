import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import getRandomWord from './services/getRandomWord';

import Button from './components/Button';
import Hangman from './components/Hangman';
import Keyboard from './components/Keyboard';
import Guess from './components/Guess';
import PopUp from './components/PopUp';
import Spinner from './components/Spinner';

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
			setGuess(
				[...word].reduce((acc, letter) => {
					acc.push({
						letter: '',
						id: uuidv4()
					});
					return acc;
				}, [])
			);
		}
	}, [ word ]);
	
	useEffect(() => {
		if (word && guess) {
			const wordStr = word.join('');
			const guessStr = guess.reduce((str, letter) => str += letter.letter, '');

			setState(guessStr === wordStr ? 'GUESSED' : state);
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
			setGuess(
				// guess.map((val, index) => letter === word[index] ? letter : val)
				guess.reduce((acc, val, index) => {
					if (letter === word[index]) {
						acc.push({
							...val,
							letter: letter
						});
					} else {
						acc.push(val);
					}
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
				setState('PLAYING');
				setWord(newWord);
			});
	}

	return (
		<Fragment>
			<div className="title text-center">
				<h1>Hangman</h1>
			</div>
			{
				word && guess ?
					<Fragment>
						<Hangman failures={failures}/>
						<Guess guess={guess} />
						<Keyboard keys={keys} guessLetter={guessLetter} />
						<Button action={reset}>New word</Button>
					</Fragment>
				: state === 'LOADING' ?
					<Spinner />
				: null
			}
			{
				state === 'GUESSED' ?
						<PopUp
							msg="You guessed it!"
							word={word}
							buttonText="Play again"
							buttonAction={reset}
						/>
				: state === 'HANGED' ?
						<PopUp
							msg="You've been hanged!"
							word={word}
							buttonText="Play again"
							buttonAction={reset}
						/>
				: null
			}
		</Fragment>
	);
}

export default App;
