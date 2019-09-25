import React from 'react';

const SvgShare = (props) => (
    <svg width={24} height={24} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.2 16.2c.7-.7 1.7-1.2 2.8-1.2 2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4c0-.2.025-.375.05-.55.025-.175.05-.35.05-.55l-5.3-3.1C8.1 15.5 7.1 16 6 16c-2.2 0-4-1.8-4-4s1.8-4 4-4c1.1 0 2.1.5 2.8 1.2l5.4-3.1a19.024 19.024 0 0 0-.051-.198C14.069 5.594 14 5.332 14 5c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4c-1.1 0-2.1-.5-2.9-1.2l-5.3 3.1.051.198c.08.308.149.57.149.902 0 .2-.025.375-.05.55-.025.175-.05.35-.05.55l5.3 3.1zM20 5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM6 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm10 5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.7 0-1.4.4-1.7 1-.2.3-.3.6-.3 1z"
            fill="#454545"
        />
        <mask
            id="share_svg__a"
            maskUnits="userSpaceOnUse"
            x={2}
            y={1}
            width={20}
            height={22}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.2 16.2c.7-.7 1.7-1.2 2.8-1.2 2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4c0-.2.025-.375.05-.55.025-.175.05-.35.05-.55l-5.3-3.1C8.1 15.5 7.1 16 6 16c-2.2 0-4-1.8-4-4s1.8-4 4-4c1.1 0 2.1.5 2.8 1.2l5.4-3.1a19.024 19.024 0 0 0-.051-.198C14.069 5.594 14 5.332 14 5c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4c-1.1 0-2.1-.5-2.9-1.2l-5.3 3.1.051.198c.08.308.149.57.149.902 0 .2-.025.375-.05.55-.025.175-.05.35-.05.55l5.3 3.1zM20 5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM6 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm10 5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.7 0-1.4.4-1.7 1-.2.3-.3.6-.3 1z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#share_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h24v24H0V0z"
                fill="#454545"
            />
        </g>
    </svg>
);

export default SvgShare;
