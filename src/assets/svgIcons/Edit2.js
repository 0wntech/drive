import React from 'react';

const SvgEdit2 = (props) => (
    <svg width={24} height={24} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7 2.3l5 5c.4.4.4 1 0 1.4l-13 13c-.2.2-.4.3-.7.3H3c-.6 0-1-.4-1-1v-5c0-.3.1-.5.3-.7l13-13c.4-.4 1-.4 1.4 0zM4 20h3.6l12-12L16 4.4l-12 12V20z"
            fill="#000"
        />
        <mask
            id="edit-2_svg__a"
            maskUnits="userSpaceOnUse"
            x={2}
            y={2}
            width={20}
            height={20}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7 2.3l5 5c.4.4.4 1 0 1.4l-13 13c-.2.2-.4.3-.7.3H3c-.6 0-1-.4-1-1v-5c0-.3.1-.5.3-.7l13-13c.4-.4 1-.4 1.4 0zM4 20h3.6l12-12L16 4.4l-12 12V20z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#edit-2_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h24v24H0V0z"
                fill="#000"
            />
        </g>
    </svg>
);

export default SvgEdit2;
