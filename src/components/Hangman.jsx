import React from 'react';

const Hangman = ({ failures }) => {
    /**
     * Depending on the number of failures loads the image of the status of the hangman
     * @returns path from the image 
     */
    function imagePath() {
        return `/images/hangman-${failures}.svg`;
    }

    return (
        <div id="hangman">
            <img src={imagePath()} alt="hangman" />
        </div>
    );
}

export default Hangman;