const API_BASE_URL = 'https://api.wordnik.com/v4/words.json';

const API_KEY = process.env.REACT_APP_WORDNIK_API_KEY;

/**
 * Send a request to wordnik API via **GET**
 * headers: content-type = 'application/json'
 * @return string new word in uppercase splited by letters
 */
export const getRandomWord = async () => {
	const randomWordUrl = `${API_BASE_URL}/randomWord?${apiKey()}`

	try {
		const response = await fetch (randomWordUrl).then(res => res.json());
		// response: { id: number, word: string }
		return response.word.toUpperCase().split('');
	} catch(err) {
		return null;
	}
}

const apiKey = () => {
	return `api_key=${API_KEY}`;
}
