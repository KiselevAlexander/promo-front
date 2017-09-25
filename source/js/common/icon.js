import React from 'react';

export const Icon = (props) => (
    <svg style={props.style}>
        <use xlinkHref={`#${props.xlink}`} />
    </svg>
);