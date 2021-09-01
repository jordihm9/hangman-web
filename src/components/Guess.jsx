import React from 'react';

import Letter from './Letter';

const Guess = ({ guess }) => {
    return (
        <div className="guess">
            {guess.map(letter => (
                <Letter
                    key={letter.id}
                    letter={letter.letter}
                />
            ))}
        </div>
    );
}

export default Guess;