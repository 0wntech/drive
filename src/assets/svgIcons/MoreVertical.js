import React from 'react';

const SvgMoreVertical = (props) => (
    <svg width={25} height={24} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm2 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-4 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"
            fill="#000"
        />
        <mask
            id="more-vertical_svg__a"
            maskUnits="userSpaceOnUse"
            x={10}
            y={3}
            width={5}
            height={18}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm2 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-4 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#more-vertical_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.5 0h24v24H.5V0z"
                fill="#333"
            />
        </g>
    </svg>
);

export default SvgMoreVertical;
