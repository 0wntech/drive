import React from 'react';

const SvgFolderPlus = (props) => (
    <svg width={24} height={24} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 5h-8.5L9.8 2.4C9.6 2.2 9.3 2 9 2H4C2.3 2 1 3.3 1 5v14c0 1.7 1.3 3 3 3h16c1.7 0 3-1.3 3-3V8c0-1.7-1.3-3-3-3zm1 14c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1h4.5l1.7 2.6c.2.2.5.4.8.4h9c.6 0 1 .4 1 1v11zm-6-4c.6 0 1-.4 1-1s-.4-1-1-1h-2v-2c0-.6-.4-1-1-1s-1 .4-1 1v2H9c-.6 0-1 .4-1 1s.4 1 1 1h2v2c0 .6.4 1 1 1s1-.4 1-1v-2h2z"
            fill="#000"
        />
        <mask
            id="folder-plus_svg__a"
            maskUnits="userSpaceOnUse"
            x={1}
            y={2}
            width={22}
            height={20}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 5h-8.5L9.8 2.4C9.6 2.2 9.3 2 9 2H4C2.3 2 1 3.3 1 5v14c0 1.7 1.3 3 3 3h16c1.7 0 3-1.3 3-3V8c0-1.7-1.3-3-3-3zm1 14c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1h4.5l1.7 2.6c.2.2.5.4.8.4h9c.6 0 1 .4 1 1v11zm-6-4c.6 0 1-.4 1-1s-.4-1-1-1h-2v-2c0-.6-.4-1-1-1s-1 .4-1 1v2H9c-.6 0-1 .4-1 1s.4 1 1 1h2v2c0 .6.4 1 1 1s1-.4 1-1v-2h2z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#folder-plus_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h24v24H0V0z"
                fill="#000"
            />
        </g>
    </svg>
);

export default SvgFolderPlus;
