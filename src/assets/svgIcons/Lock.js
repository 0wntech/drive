import * as React from 'react';

function SvgLock(props) {
    return (
        <svg width={28} height={28} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.167 11.666H21v-3.5c0-3.85-3.15-7-7-7s-7 3.15-7 7v3.5H5.833c-1.983 0-3.5 1.517-3.5 3.5v8.167c0 1.984 1.517 3.5 3.5 3.5h16.334c1.983 0 3.5-1.516 3.5-3.5v-8.166c0-1.984-1.517-3.5-3.5-3.5zm-12.834-3.5A4.68 4.68 0 0114 3.5a4.68 4.68 0 014.667 4.666v3.5H9.333v-3.5zM22.168 24.5c.7 0 1.166-.467 1.166-1.167v-8.166c0-.7-.466-1.167-1.166-1.167H5.833c-.7 0-1.166.466-1.166 1.166v8.167c0 .7.466 1.167 1.167 1.167h16.333z"
                fill="#333"
            />
            <mask
                id="lock_svg__a"
                maskUnits="userSpaceOnUse"
                x={2}
                y={1}
                width={24}
                height={26}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.167 11.666H21v-3.5c0-3.85-3.15-7-7-7s-7 3.15-7 7v3.5H5.833c-1.983 0-3.5 1.517-3.5 3.5v8.167c0 1.984 1.517 3.5 3.5 3.5h16.334c1.983 0 3.5-1.516 3.5-3.5v-8.166c0-1.984-1.517-3.5-3.5-3.5zm-12.834-3.5A4.68 4.68 0 0114 3.5a4.68 4.68 0 014.667 4.666v3.5H9.333v-3.5zM22.168 24.5c.7 0 1.166-.467 1.166-1.167v-8.166c0-.7-.466-1.167-1.166-1.167H5.833c-.7 0-1.166.466-1.166 1.166v8.167c0 .7.466 1.167 1.167 1.167h16.333z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#lock_svg__a)">
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

export default SvgLock;
