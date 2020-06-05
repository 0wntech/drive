import React from 'react';

const SvgFolderPlus = (props) => (
    <svg width={28} height={28} fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.333 5.833h-9.916L11.432 2.8c-.233-.233-.583-.466-.933-.466H4.667c-1.984 0-3.5 1.516-3.5 3.5v16.333c0 1.983 1.516 3.5 3.5 3.5h18.666c1.984 0 3.5-1.517 3.5-3.5V9.333c0-1.983-1.516-3.5-3.5-3.5zM24.5 22.168c0 .7-.467 1.166-1.167 1.166H4.667c-.7 0-1.167-.466-1.167-1.166V5.833c0-.7.466-1.166 1.167-1.166h5.25L11.9 7.7c.233.234.583.467.933.467h10.5c.7 0 1.167.466 1.167 1.167v12.833zm-7-4.667c.7 0 1.166-.466 1.166-1.166s-.466-1.167-1.166-1.167h-2.334v-2.333c0-.7-.466-1.167-1.166-1.167s-1.167.466-1.167 1.167v2.333H10.5c-.7 0-1.167.466-1.167 1.167 0 .7.467 1.166 1.167 1.166h2.333v2.334c0 .7.467 1.166 1.167 1.166s1.166-.466 1.166-1.166V17.5H17.5z"
            fill="#333"
        />
        <mask
            id="folder-plus_svg__a"
            maskUnits="userSpaceOnUse"
            x={1}
            y={2}
            width={26}
            height={24}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.333 5.833h-9.916L11.432 2.8c-.233-.233-.583-.466-.933-.466H4.667c-1.984 0-3.5 1.516-3.5 3.5v16.333c0 1.983 1.516 3.5 3.5 3.5h18.666c1.984 0 3.5-1.517 3.5-3.5V9.333c0-1.983-1.516-3.5-3.5-3.5zM24.5 22.168c0 .7-.467 1.166-1.167 1.166H4.667c-.7 0-1.167-.466-1.167-1.166V5.833c0-.7.466-1.166 1.167-1.166h5.25L11.9 7.7c.233.234.583.467.933.467h10.5c.7 0 1.167.466 1.167 1.167v12.833zm-7-4.667c.7 0 1.166-.466 1.166-1.166s-.466-1.167-1.166-1.167h-2.334v-2.333c0-.7-.466-1.167-1.166-1.167s-1.167.466-1.167 1.167v2.333H10.5c-.7 0-1.167.466-1.167 1.167 0 .7.467 1.166 1.167 1.166h2.333v2.334c0 .7.467 1.166 1.167 1.166s1.166-.466 1.166-1.166V17.5H17.5z"
                fill="#fff"
            />
        </mask>
        <g mask="url(#folder-plus_svg__a)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h28v28H0V0z"
                fill="#333"
            />
        </g>
    </svg>
);

export default SvgFolderPlus;
