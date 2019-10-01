import React from 'react';

const SvgTrash = (props) => (
    <svg width={24} height={24} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 5h-4V4c0-1.7-1.3-3-3-3h-4C8.3 1 7 2.3 7 4v1H3c-.6 0-1 .4-1 1s.4 1 1 1h1v13c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V7h1c.6 0 1-.4 1-1s-.4-1-1-1zM9 4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v1H9V4zm8 17c.6 0 1-.4 1-1V7H6v13c0 .6.4 1 1 1h10zm-6-10v6c0 .6-.4 1-1 1s-1-.4-1-1v-6c0-.6.4-1 1-1s1 .4 1 1zm4 6v-6c0-.6-.4-1-1-1s-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1z"
            fill="#454545"
        />
        <mask
            id="trash_svg__a"
            maskUnits="userSpaceOnUse"
            x={2}
            y={1}
            width={20}
            height={22}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 5h-4V4c0-1.7-1.3-3-3-3h-4C8.3 1 7 2.3 7 4v1H3c-.6 0-1 .4-1 1s.4 1 1 1h1v13c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V7h1c.6 0 1-.4 1-1s-.4-1-1-1zM9 4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v1H9V4zm8 17c.6 0 1-.4 1-1V7H6v13c0 .6.4 1 1 1h10zm-6-10v6c0 .6-.4 1-1 1s-1-.4-1-1v-6c0-.6.4-1 1-1s1 .4 1 1zm4 6v-6c0-.6-.4-1-1-1s-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#trash_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h24v24H0V0z"
                fill="#454545"
            />
        </g>
    </svg>
);

export default SvgTrash;
