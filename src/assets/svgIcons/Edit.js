import * as React from 'react';

function SvgEdit(props) {
    return (
        <svg width={24} height={24} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 18h4c.3 0 .5-.1.7-.3l11-11c.4-.4.4-1 0-1.4l-4-4c-.4-.4-1-.4-1.4 0l-11 11c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1zm1-4.6l10-10L16.6 6l-10 10H4v-2.6zM21 23c.6 0 1-.4 1-1s-.4-1-1-1H3c-.6 0-1 .4-1 1s.4 1 1 1h18z"
                fill="#333"
            />
            <mask
                id="edit_svg__a"
                maskUnits="userSpaceOnUse"
                x={2}
                y={1}
                width={20}
                height={22}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 18h4c.3 0 .5-.1.7-.3l11-11c.4-.4.4-1 0-1.4l-4-4c-.4-.4-1-.4-1.4 0l-11 11c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1zm1-4.6l10-10L16.6 6l-10 10H4v-2.6zM21 23c.6 0 1-.4 1-1s-.4-1-1-1H3c-.6 0-1 .4-1 1s.4 1 1 1h18z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#edit_svg__a)">
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

export default SvgEdit;
