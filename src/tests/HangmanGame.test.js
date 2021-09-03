import { renderHook, act } from '@testing-library/react-hooks';

import HangmanGame from './../utils/HangmanGame';

describe('Hangman Game Logic', () => {
	let hangmanGame;
	const letterInWord = 'H', letterNotInWord = 'A';

	beforeEach(() => {
		hangmanGame = renderHook(HangmanGame);

		const word = ['H', 'E', 'L', 'L', 'O'];
		act(() => hangmanGame.result.current.setWord([...word]));
	});

	describe('test state', () => {
		test('should change the state to playing after 250ms when word is changed', () => {
			setTimeout(() => {
				expect(hangmanGame.result.current.state).toBe(/playing/i);
			}, 250);
		});

		test('state sould be guessed when word is guessed', () => {
			const lettersInWord = 'HELO'.split('');

			const { guessLetter, state } = hangmanGame.result.current;

			lettersInWord.forEach(l => {
				act(() => {
					guessLetter(l);
				});
			});

			setTimeout(() => expect(state).toBe(/guessed/i), 250);
		});

		test('state should be hanged when number of failures is reached', () => {
			const lettersNotInWord = 'QWRTYUIPAS'.split('');

			const { guessLetter, state } = hangmanGame.result.current;

			lettersNotInWord.forEach(l => {
				act(() => {
					guessLetter(l);
				});
			});

			setTimeout(() => expect(state).toBe(/hanged/i), 250);
		});

	});

	describe('when a letter that is included in the word', () => {
		beforeEach(() => {
			act(() => hangmanGame.result.current.guessLetter(letterInWord));
		})

		test('guess should update adding the letter', () => {
			const letter = {
				'letter': letterInWord
			}

			expect(hangmanGame.result.current.guess).toContainEqual(
				expect.objectContaining(letter)
			);
		});

		test('should update the key in the keyboard', () => {
			const key = {
				'letter': letterInWord,
				'inWord': true,
				'used': true
			};

			expect(hangmanGame.result.current.keys).toContainEqual(key);
		});
	});

	describe('when a letter that is NOT included in the word', () => {
		beforeEach(() => {
			act(() => hangmanGame.result.current.guessLetter(letterNotInWord));
		});

		test('should update the key in the keyboard', () => {
			const key = {
				'letter': letterNotInWord,
				'inWord': false,
				'used': true
			}

			expect(hangmanGame.result.current.keys).toContainEqual(key);
		});
	});
});