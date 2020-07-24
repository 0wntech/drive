import * as React from 'react';

function SvgCopy(props) {
    return (
        <svg width={24} height={24} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 16c.6 0 1-.4 1-1s-.4-1-1-1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1h9c.6 0 1 .4 1 1v1c0 .6.4 1 1 1s1-.4 1-1V4c0-1.7-1.3-3-3-3H4C2.3 1 1 2.3 1 4v9c0 1.7 1.3 3 3 3h1zm15-8h-9c-1.7 0-3 1.3-3 3v9c0 1.7 1.3 3 3 3h9c1.7 0 3-1.3 3-3v-9c0-1.7-1.3-3-3-3zm1 12c0 .6-.4 1-1 1h-9c-.6 0-1-.4-1-1v-9c0-.6.4-1 1-1h9c.6 0 1 .4 1 1v9z"
                fill="#333"
            />
            <mask
                id="copy_svg__a"
                maskUnits="userSpaceOnUse"
                x={1}
                y={1}
                width={22}
                height={22}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 16c.6 0 1-.4 1-1s-.4-1-1-1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1h9c.6 0 1 .4 1 1v1c0 .6.4 1 1 1s1-.4 1-1V4c0-1.7-1.3-3-3-3H4C2.3 1 1 2.3 1 4v9c0 1.7 1.3 3 3 3h1zm15-8h-9c-1.7 0-3 1.3-3 3v9c0 1.7 1.3 3 3 3h9c1.7 0 3-1.3 3-3v-9c0-1.7-1.3-3-3-3zm1 12c0 .6-.4 1-1 1h-9c-.6 0-1-.4-1-1v-9c0-.6.4-1 1-1h9c.6 0 1 .4 1 1v9z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#copy_svg__a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0h24v24H0V0z"
                    fill="#454545"
                />
            </g>
        </svg>
    );
}

export default SvgCopy;
