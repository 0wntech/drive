import React from 'react';

const SvgCheck = (props) => (
    <svg width={32} height={32} fill="none" {...props}>
        <path
            d="M27.6 10.267L12.933 24.933c-.266.267-.533.4-.933.4s-.667-.133-.933-.4L4.4 18.267a1.289 1.289 0 010-1.867 1.289 1.289 0 011.867 0L12 22.133 25.733 8.4a1.289 1.289 0 011.867 0 1.289 1.289 0 010 1.867z"
            fill="#36A510"
        />
        <mask
            id="check_svg__a"
            maskUnits="userSpaceOnUse"
            x={4}
            y={8}
            width={24}
            height={18}
        >
            <path
                d="M27.6 10.267L12.933 24.933c-.266.267-.533.4-.933.4s-.667-.133-.933-.4L4.4 18.267a1.289 1.289 0 010-1.867 1.289 1.289 0 011.867 0L12 22.133 25.733 8.4a1.289 1.289 0 011.867 0 1.289 1.289 0 010 1.867z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#check_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h32v32H0V0z"
                fill="#36A510"
            />
        </g>
    </svg>
);

export default SvgCheck;
