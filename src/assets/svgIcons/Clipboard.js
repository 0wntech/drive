import * as React from 'react';

function SvgClipboard(props) {
    return (
        <svg width={24} height={24} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 3h-1c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2H6C4.3 3 3 4.3 3 6v14c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3V6c0-1.7-1.3-3-3-3zM9 3h6v2H9V3zm9 18c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1h-1c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2H6c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h12z"
                fill="#333"
            />
            <mask
                id="clipboard_svg__a"
                maskUnits="userSpaceOnUse"
                x={3}
                y={1}
                width={18}
                height={22}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 3h-1c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2H6C4.3 3 3 4.3 3 6v14c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3V6c0-1.7-1.3-3-3-3zM9 3h6v2H9V3zm9 18c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1h-1c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2H6c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h12z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#clipboard_svg__a)">
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

export default SvgClipboard;
