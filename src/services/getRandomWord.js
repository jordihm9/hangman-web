/**
 * Send a request to https://random-words-api.herokuapp.com/w?n=1 via **GET**
 * API: https://random-words-api.herokuapp.com
 * headers: content-type = 'application/json'
 * @return {array} new word in uppercase splited by letters
 */
async function getRandomWord() {
	let word;
	const API_URL = 'https://random-words-api.herokuapp.com/w?n=1';

	const OPTIONS = {
		'headers': {
			'Content-Type': 'application/json'
		}
	}

	await fetch (API_URL, OPTIONS)
		.then(response => response.json()) // getting the response as json
		.then(words => word = words[0].toUpperCase().split(''))
		.catch(err => word = null);

	return word;
}

export default getRandomWord;