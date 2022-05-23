import React from 'react';

const Emoji = (props) => {
    const { label, symbol, ...rest } = props;
    return (
        <span
            {...rest}
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
        >
            {symbol}
        </span>
    );
}

export default Emoji;