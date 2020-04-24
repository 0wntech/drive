import React from 'react';

const SvgAlert = (props) => (
    <svg width={24} height={24} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 12c0 6.1 4.9 11 11 11s11-4.9 11-11S18.1 1 12 1 1 5.9 1 12zm2 0c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9zm10 0V8c0-.6-.4-1-1-1s-1 .4-1 1v4c0 .6.4 1 1 1s1-.4 1-1zm-.3 4.7c-.2.2-.4.3-.8.3-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7 0-.117.034-.2.063-.269A.358.358 0 0011 15.6c0-.1.1-.2.2-.3.3-.3.7-.4 1.1-.2.05 0 .075.025.1.05.025.025.05.05.1.05.1 0 .2.1.2.1.05.05.075.1.1.15.025.05.05.1.1.15.1.1.1.3.1.4 0 .05-.025.125-.05.2a.773.773 0 00-.05.2c0 .1-.1.2-.2.3z"
            fill="red"
        />
        <mask
            id="alert_svg__a"
            maskUnits="userSpaceOnUse"
            x={1}
            y={1}
            width={22}
            height={22}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 12c0 6.1 4.9 11 11 11s11-4.9 11-11S18.1 1 12 1 1 5.9 1 12zm2 0c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9zm10 0V8c0-.6-.4-1-1-1s-1 .4-1 1v4c0 .6.4 1 1 1s1-.4 1-1zm-.3 4.7c-.2.2-.4.3-.8.3-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7 0-.117.034-.2.063-.269A.358.358 0 0011 15.6c0-.1.1-.2.2-.3.3-.3.7-.4 1.1-.2.05 0 .075.025.1.05.025.025.05.05.1.05.1 0 .2.1.2.1.05.05.075.1.1.15.025.05.05.1.1.15.1.1.1.3.1.4 0 .05-.025.125-.05.2a.773.773 0 00-.05.2c0 .1-.1.2-.2.3z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#alert_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h24v24H0V0z"
                fill="red"
            />
        </g>
    </svg>
);

export default SvgAlert;
