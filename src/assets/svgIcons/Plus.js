import * as React from 'react';

function SvgPlus(props) {
    return (
        <svg width={25} height={24} fill="none" {...props}>
            <path
                d="M20.901 12c0 .6-.402 1-1.005 1h-6.03v6c0 .6-.402 1-1.005 1-.603 0-1.005-.4-1.005-1v-6h-6.03c-.602 0-1.004-.4-1.004-1s.402-1 1.005-1h6.03V5c0-.6.401-1 1.004-1s1.005.4 1.005 1v6h6.03c.603 0 1.005.4 1.005 1z"
                fill="#fff"
            />
            <mask
                id="plus_svg__a"
                maskUnits="userSpaceOnUse"
                x={4}
                y={4}
                width={17}
                height={16}
            >
                <path
                    d="M20.901 12c0 .6-.402 1-1.005 1h-6.03v6c0 .6-.402 1-1.005 1-.603 0-1.005-.4-1.005-1v-6h-6.03c-.602 0-1.004-.4-1.004-1s.402-1 1.005-1h6.03V5c0-.6.401-1 1.004-1s1.005.4 1.005 1v6h6.03c.603 0 1.005.4 1.005 1z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#plus_svg__a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M.802 0h24.119v24H.802V0z"
                    fill="#fff"
                />
            </g>
        </svg>
    );
}

export default SvgPlus;
