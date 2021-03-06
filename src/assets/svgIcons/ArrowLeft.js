import * as React from 'react';

function SvgArrowLeft(props) {
    return (
        <svg width={28} height={28} fill="none" {...props}>
            <path
                d="M24.5 14c0 .7-.466 1.166-1.166 1.166H7.466l5.016 5.017a1.128 1.128 0 010 1.633c-.233.234-.466.35-.816.35-.35 0-.583-.116-.817-.35l-7-7c-.117-.116-.233-.233-.233-.35-.117-.233-.117-.583 0-.933.116-.117.116-.233.233-.35l7-7a1.128 1.128 0 011.633 0 1.128 1.128 0 010 1.633l-5.016 5.017h15.867c.7 0 1.166.467 1.166 1.167z"
                fill="#333"
            />
            <mask
                id="arrow-left_svg__a"
                maskUnits="userSpaceOnUse"
                x={3}
                y={5}
                width={22}
                height={18}
            >
                <path
                    d="M24.5 14c0 .7-.466 1.166-1.166 1.166H7.466l5.016 5.017a1.128 1.128 0 010 1.633c-.233.234-.466.35-.816.35-.35 0-.583-.116-.817-.35l-7-7c-.117-.116-.233-.233-.233-.35-.117-.233-.117-.583 0-.933.116-.117.116-.233.233-.35l7-7a1.128 1.128 0 011.633 0 1.128 1.128 0 010 1.633l-5.016 5.017h15.867c.7 0 1.166.467 1.166 1.167z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#arrow-left_svg__a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0h28v28H0V0z"
                    fill="#333"
                />
            </g>
        </svg>
    );
}

export default SvgArrowLeft;
