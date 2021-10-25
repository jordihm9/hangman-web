import React from 'react';

const Button = ({ children, action, tabIndex = null }) => {
    return (
        <button className="btn" onClick={action} tabIndex={tabIndex}>
            {children}
        </button>
    );
}

export default Button;
