import React from 'react';

const Letter = ({ letter }) => {
    return (
        <div className={`letter ${letter !== '' && 'appear'}`}>{letter}</div>
    );
}

export default Letter;