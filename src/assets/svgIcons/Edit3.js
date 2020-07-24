import * as React from 'react';

function SvgEdit3(props) {
    return (
        <svg width={28} height={28} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.5 21h4.667c.35 0 .583-.117.816-.35L21.817 7.817a1.128 1.128 0 000-1.634L17.15 1.516a1.128 1.128 0 00-1.633 0L2.684 14.35c-.234.233-.35.466-.35.816v4.667c0 .7.466 1.167 1.166 1.167zm1.167-5.367L16.333 3.967 19.367 7 7.7 18.666H4.667v-3.033zm19.833 11.2c.7 0 1.167-.466 1.167-1.166S25.2 24.5 24.5 24.5h-21c-.7 0-1.167.466-1.167 1.166S2.8 26.834 3.5 26.834h21z"
                fill="#333"
            />
            <mask
                id="edit-3_svg__a"
                maskUnits="userSpaceOnUse"
                x={2}
                y={1}
                width={24}
                height={26}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 21h4.667c.35 0 .583-.117.816-.35L21.817 7.817a1.128 1.128 0 000-1.634L17.15 1.516a1.128 1.128 0 00-1.633 0L2.684 14.35c-.234.233-.35.466-.35.816v4.667c0 .7.466 1.167 1.166 1.167zm1.167-5.367L16.333 3.967 19.367 7 7.7 18.666H4.667v-3.033zm19.833 11.2c.7 0 1.167-.466 1.167-1.166S25.2 24.5 24.5 24.5h-21c-.7 0-1.167.466-1.167 1.166S2.8 26.834 3.5 26.834h21z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#edit-3_svg__a)">
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

export default SvgEdit3;
