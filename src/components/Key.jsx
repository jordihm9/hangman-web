import React from 'react';

const Key = ({ letter, guessLetter }) => {
	function clickHandler() {
		if (letter.used) return;
		guessLetter(letter.letter);
	}

	/**
	 * Adds the classes depending on the properties
	 * @returns {string}
	 */
	function setClasses() {
		let classes = ['key'];
		if (letter.used) {
			classes.push('used');
			if (letter.inWord) {
				classes.push('in_word');
			}
		}

		return classes.join(' ');
	}

	return (
		<div className={setClasses()} onClick={clickHandler}>
			{letter.letter}
		</div>
	);
}

export default Key;