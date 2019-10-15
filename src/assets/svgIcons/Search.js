import React from 'react';

const SvgSearch = (props) => (
    <svg width={24} height={24} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.2 15.8l4.5 4.5c.4.4.4 1 0 1.4-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3l-4.5-4.5c-1.5 1.1-3.3 1.8-5.3 1.8C5.8 19 2 15.2 2 10.5S5.8 2 10.5 2 19 5.8 19 10.5c0 2-.7 3.9-1.8 5.3zM10.5 4C6.9 4 4 6.9 4 10.5S6.9 17 10.5 17c1.8 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.8 1.9-4.6C17 6.9 14.1 4 10.5 4z"
            fill="#5C94FF"
        />
        <mask
            id="search_svg__a"
            maskUnits="userSpaceOnUse"
            x={2}
            y={2}
            width={20}
            height={20}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.2 15.8l4.5 4.5c.4.4.4 1 0 1.4-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3l-4.5-4.5c-1.5 1.1-3.3 1.8-5.3 1.8C5.8 19 2 15.2 2 10.5S5.8 2 10.5 2 19 5.8 19 10.5c0 2-.7 3.9-1.8 5.3zM10.5 4C6.9 4 4 6.9 4 10.5S6.9 17 10.5 17c1.8 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.8 1.9-4.6C17 6.9 14.1 4 10.5 4z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#search_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h24v24H0V0z"
                fill="#5C94FF"
            />
        </g>
    </svg>
);

export default SvgSearch;
