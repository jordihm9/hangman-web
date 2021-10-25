import React from 'react';

import Button from './Button';

const PopUp = ({ msg, word, buttonText, buttonAction }) => {
	return (
		<div className="outer">
			<div className="popup">
				<div className="content">
					<div className="msg">{msg}</div>
					<div className="word">{word}</div>
				</div>
			<div className="button__container">
				<Button tabIndex="1" action={buttonAction}>{buttonText}</Button>
			</div>
			</div>
		</div>
	);
}

export default PopUp;