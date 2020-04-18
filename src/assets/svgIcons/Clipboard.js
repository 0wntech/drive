import React from 'react';

const SvgClipboard = (props) => (
    <svg width={28} height={28} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 3.5h-1.167A2.34 2.34 0 0017.5 1.167h-7A2.34 2.34 0 008.167 3.5H7C5.017 3.5 3.5 5.016 3.5 7v16.333c0 1.984 1.517 3.5 3.5 3.5h14c1.983 0 3.5-1.516 3.5-3.5V7c0-1.984-1.517-3.5-3.5-3.5zm-10.5 0h7v2.333h-7V3.5zm10.5 21c.7 0 1.167-.467 1.167-1.167V7c0-.7-.467-1.167-1.167-1.167h-1.167A2.34 2.34 0 0117.5 8.166h-7a2.34 2.34 0 01-2.333-2.333H7c-.7 0-1.167.467-1.167 1.167v16.333c0 .7.467 1.167 1.167 1.167h14z"
            fill="#333"
        />
        <mask
            id="clipboard_svg__a"
            maskUnits="userSpaceOnUse"
            x={3}
            y={1}
            width={22}
            height={26}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 3.5h-1.167A2.34 2.34 0 0017.5 1.167h-7A2.34 2.34 0 008.167 3.5H7C5.017 3.5 3.5 5.016 3.5 7v16.333c0 1.984 1.517 3.5 3.5 3.5h14c1.983 0 3.5-1.516 3.5-3.5V7c0-1.984-1.517-3.5-3.5-3.5zm-10.5 0h7v2.333h-7V3.5zm10.5 21c.7 0 1.167-.467 1.167-1.167V7c0-.7-.467-1.167-1.167-1.167h-1.167A2.34 2.34 0 0117.5 8.166h-7a2.34 2.34 0 01-2.333-2.333H7c-.7 0-1.167.467-1.167 1.167v16.333c0 .7.467 1.167 1.167 1.167h14z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#clipboard_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h28v28H0V0z"
                fill="#333"
            />
        </g>
    </svg>
);

export default SvgClipboard;
