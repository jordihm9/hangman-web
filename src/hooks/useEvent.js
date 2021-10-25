import { useEffect } from 'react';

const useEvent = (event, handler, passive = false) => {
	useEffect(() => {
		window.addEventListener(event, handler, passive);

		return function cleanup() {
			window.removeEventListener(event, handler);
		}
	})
}

export default useEvent;
