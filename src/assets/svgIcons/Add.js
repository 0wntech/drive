import * as React from 'react';

function SvgAdd(props) {
    return (
        <svg width={29} height={28} fill="none" {...props}>
            <ellipse
                cx={14.74}
                cy={13.901}
                rx={13.948}
                ry={13.901}
                fill="#36A510"
            />
            <path
                d="M22.901 14c0 .6-.402 1-1.005 1h-6.03v6c0 .6-.402 1-1.005 1-.603 0-1.005-.4-1.005-1v-6h-6.03c-.602 0-1.004-.4-1.004-1s.402-1 1.005-1h6.03V7c0-.6.401-1 1.004-1s1.005.4 1.005 1v6h6.03c.603 0 1.005.4 1.005 1z"
                fill="#fff"
            />
            <mask
                id="add_svg__a"
                maskUnits="userSpaceOnUse"
                x={6}
                y={6}
                width={17}
                height={16}
            >
                <path
                    d="M22.901 14c0 .6-.402 1-1.005 1h-6.03v6c0 .6-.402 1-1.005 1-.603 0-1.005-.4-1.005-1v-6h-6.03c-.602 0-1.004-.4-1.004-1s.402-1 1.005-1h6.03V7c0-.6.401-1 1.004-1s1.005.4 1.005 1v6h6.03c.603 0 1.005.4 1.005 1z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#add_svg__a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.802 2h24.119v24H2.802V2z"
                    fill="#fff"
                />
            </g>
        </svg>
    );
}

export default SvgAdd;
