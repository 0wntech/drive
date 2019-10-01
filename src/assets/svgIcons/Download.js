import React from 'react';

const SvgDownload = (props) => (
    <svg width={24} height={24} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.6 16.9c-.1 0-.2-.1-.3-.2l-4-4c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l2.3 2.3V2c0-.6.4-1 1-1s1 .4 1 1v11.6l2.3-2.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4 4c-.05.05-.1.075-.15.1-.05.025-.1.05-.15.1-.1.1-.3.1-.4.1-.1 0-.3 0-.4-.1zM22 20v-3c0-.6-.4-1-1-1s-1 .4-1 1v3c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1v-3c0-.6-.4-1-1-1s-1 .4-1 1v3c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3z"
            fill="#454545"
        />
        <mask
            id="download_svg__a"
            maskUnits="userSpaceOnUse"
            x={2}
            y={1}
            width={20}
            height={22}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6 16.9c-.1 0-.2-.1-.3-.2l-4-4c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l2.3 2.3V2c0-.6.4-1 1-1s1 .4 1 1v11.6l2.3-2.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4 4c-.05.05-.1.075-.15.1-.05.025-.1.05-.15.1-.1.1-.3.1-.4.1-.1 0-.3 0-.4-.1zM22 20v-3c0-.6-.4-1-1-1s-1 .4-1 1v3c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1v-3c0-.6-.4-1-1-1s-1 .4-1 1v3c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#download_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h24v24H0V0z"
                fill="#454545"
            />
        </g>
    </svg>
);

export default SvgDownload;
