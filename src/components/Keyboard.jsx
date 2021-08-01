import React from 'react';

import Key from './Key';

const Keyboard = ({ keys, guessLetter }) => {
    return (
        <div className="keyboard">
            {keys.map(key => (
                <Key
                    key={key.letter}
                    letter={key}
                    guessLetter={guessLetter}
                />
            ))}
        </div>
    );
}

export default Keyboard;