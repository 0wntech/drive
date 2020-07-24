import * as React from 'react';

function SvgFilePlus(props) {
    return (
        <svg width={24} height={24} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.8 7.45c.025.05.05.1.1.15.1.1.1.3.1.4v12c0 1.7-1.3 3-3 3H6c-1.7 0-3-1.3-3-3V4c0-1.7 1.3-3 3-3h8c.1 0 .3 0 .4.1.1 0 .2.1.3.2l6 6c.05.05.075.1.1.15zM17.6 7L15 4.4V7h2.6zm.4 14H6c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1h7v5c0 .6.4 1 1 1h5v11c0 .6-.4 1-1 1zm-3-5c.6 0 1-.4 1-1s-.4-1-1-1h-2v-2c0-.6-.4-1-1-1s-1 .4-1 1v2H9c-.6 0-1 .4-1 1s.4 1 1 1h2v2c0 .6.4 1 1 1s1-.4 1-1v-2h2z"
                fill="#000"
            />
            <mask
                id="file-plus_svg__a"
                maskUnits="userSpaceOnUse"
                x={3}
                y={1}
                width={18}
                height={22}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.8 7.45c.025.05.05.1.1.15.1.1.1.3.1.4v12c0 1.7-1.3 3-3 3H6c-1.7 0-3-1.3-3-3V4c0-1.7 1.3-3 3-3h8c.1 0 .3 0 .4.1.1 0 .2.1.3.2l6 6c.05.05.075.1.1.15zM17.6 7L15 4.4V7h2.6zm.4 14H6c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1h7v5c0 .6.4 1 1 1h5v11c0 .6-.4 1-1 1zm-3-5c.6 0 1-.4 1-1s-.4-1-1-1h-2v-2c0-.6-.4-1-1-1s-1 .4-1 1v2H9c-.6 0-1 .4-1 1s.4 1 1 1h2v2c0 .6.4 1 1 1s1-.4 1-1v-2h2z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#file-plus_svg__a)">
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

export default SvgFilePlus;
