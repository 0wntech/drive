import * as React from 'react';

function SvgArrowRight(props) {
    return (
        <svg width={20} height={20} fill="none" {...props}>
            <path
                d="M17.25 10.583l-5 5a.756.756 0 01-.583.25.757.757 0 01-.584-.25.806.806 0 010-1.166l3.584-3.584H3.333c-.5 0-.833-.333-.833-.833 0-.5.333-.833.833-.833h11.334l-3.584-3.584a.806.806 0 010-1.166.806.806 0 011.167 0l5 5c.083.083.167.166.167.25.083.166.083.416 0 .666 0 .084-.084.167-.167.25z"
                fill="#000"
            />
            <mask
                id="arrowRight_svg__a"
                maskUnits="userSpaceOnUse"
                x={2}
                y={4}
                width={16}
                height={12}
            >
                <path
                    d="M17.25 10.583l-5 5a.756.756 0 01-.583.25.757.757 0 01-.584-.25.806.806 0 010-1.166l3.584-3.584H3.333c-.5 0-.833-.333-.833-.833 0-.5.333-.833.833-.833h11.334l-3.584-3.584a.806.806 0 010-1.166.806.806 0 011.167 0l5 5c.083.083.167.166.167.25.083.166.083.416 0 .666 0 .084-.084.167-.167.25z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#arrowRight_svg__a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0h20v20H0V0z"
                    fill="#000"
                />
            </g>
        </svg>
    );
}

export default SvgArrowRight;
