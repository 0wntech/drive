import * as React from 'react';

function SvgDropdown(props) {
    return (
        <svg width={14} height={10} fill="none" {...props}>
            <path d="M0 0h14L7 10 0 0z" fill="#C4C4C4" />
        </svg>
    );
}

export default SvgDropdown;
