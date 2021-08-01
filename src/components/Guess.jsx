import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Letter from './Letter';

const Guess = ({ guess }) => {
    return (
        <div className="guess">
            {guess.map(letter => (
                <Letter
                    key={uuidv4()}
                    letter={letter}
                />
            ))}
        </div>
    );
}

export default Guess;