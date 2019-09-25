import React from 'react';

const SvgEdit = (props) => (
    <svg width={32} height={32} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.267 3.067l6.666 6.666a1.289 1.289 0 010 1.867L11.6 28.933c-.267.267-.533.4-.933.4H4c-.8 0-1.333-.533-1.333-1.333v-6.667c0-.4.133-.666.4-.933L20.4 3.067a1.289 1.289 0 011.867 0zm-16.934 23.6h4.8l16-16-4.8-4.8-16 16v4.8z"
            fill="#000"
        />
        <mask
            id="edit_svg__a"
            maskUnits="userSpaceOnUse"
            x={2}
            y={2}
            width={28}
            height={28}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.267 3.067l6.666 6.666a1.289 1.289 0 010 1.867L11.6 28.933c-.267.267-.533.4-.933.4H4c-.8 0-1.333-.533-1.333-1.333v-6.667c0-.4.133-.666.4-.933L20.4 3.067a1.289 1.289 0 011.867 0zm-16.934 23.6h4.8l16-16-4.8-4.8-16 16v4.8z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#edit_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h32v32H0V0z"
                fill="#000"
            />
        </g>
    </svg>
);

export default SvgEdit;
