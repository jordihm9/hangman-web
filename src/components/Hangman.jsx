import React from 'react';

const Hangman = ({ failures }) => {
    // /**
    //  * Depending on the number of failures loads the image of the status of the hangman
    //  * @returns path from the image 
    //  */
    // function imagePath() {
    //     return `/images/hangman-${failures}.svg`;
    // }

    // return (
    //     <div id="hangman">
    //         <img src={imagePath()} alt="hangman" />
    //     </div>
    // );

    return (
        <div id="hangman">
            <div className={`hangman base ${failures >= 1 ? 'show' : ''}`}></div>
            <div className={`hangman stick ${failures >= 2 ? 'show' : ''}`}></div>
            <div className={`hangman top ${failures >= 3 ? 'show' : ''}`}></div>
            <div className="hangman man">
                <div className={`hangman rope ${failures >= 4 ? 'show' : ''}`}></div>
                <div className={`hangman head ${failures >= 5 ? 'show' : ''}`}></div>
                <div className={`hangman body ${failures >= 6 ? 'show' : ''}`}></div>
                <div className={`hangman arm right ${failures >= 7 ? 'show' : ''}`}></div>
                <div className={`hangman arm left ${failures >= 8 ? 'show' : ''}`}></div>
                <div className={`hangman leg right ${failures >= 9 ? 'show' : ''}`}></div>
                <div className={`hangman leg left ${failures >= 10 ? 'show' : ''}`}></div>
            </div>
        </div>
    );
}

export default Hangman;