import * as React from 'react';

function SvgFolder(props) {
    return (
        <svg width={20} height={20} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.583 4.167h7.084c1.416 0 2.5 1.083 2.5 2.5v9.166c0 1.417-1.084 2.5-2.5 2.5H3.333c-1.416 0-2.5-1.083-2.5-2.5V4.167c0-1.417 1.084-2.5 2.5-2.5H7.5c.25 0 .5.166.667.333l1.416 2.167zm7.084 12.5c.5 0 .833-.334.833-.834V6.667c0-.5-.333-.834-.833-.834h-7.5c-.25 0-.5-.166-.667-.333L7.083 3.333h-3.75c-.5 0-.833.334-.833.834v11.666c0 .5.333.834.833.834h13.334z"
                fill="#000"
            />
            <mask
                id="folder_svg__a"
                maskUnits="userSpaceOnUse"
                x={0}
                y={1}
                width={20}
                height={18}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.583 4.167h7.084c1.416 0 2.5 1.083 2.5 2.5v9.166c0 1.417-1.084 2.5-2.5 2.5H3.333c-1.416 0-2.5-1.083-2.5-2.5V4.167c0-1.417 1.084-2.5 2.5-2.5H7.5c.25 0 .5.166.667.333l1.416 2.167zm7.084 12.5c.5 0 .833-.334.833-.834V6.667c0-.5-.333-.834-.833-.834h-7.5c-.25 0-.5-.166-.667-.333L7.083 3.333h-3.75c-.5 0-.833.334-.833.834v11.666c0 .5.333.834.833.834h13.334z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#folder_svg__a)">
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

export default SvgFolder;
