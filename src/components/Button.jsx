import React from 'react';

const Button = ({ children, action }) => {
    return (
        <button className="btn" onClick={action}>
            {children}
        </button>
    );
}

export default Button;