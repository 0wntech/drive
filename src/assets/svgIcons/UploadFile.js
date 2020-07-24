import * as React from 'react';

function SvgUploadFile(props) {
    return (
        <svg width={24} height={24} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.9 8.6a.523.523 0 01-.1-.15c-.025-.05-.05-.1-.1-.15l-7-7c-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.4-.1H6C4.3 1 3 2.3 3 4v16c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3V9c0-.1 0-.3-.1-.4zM14 4.4L17.6 8H14V4.4zM6 21h12c.6 0 1-.4 1-1V10h-6c-.6 0-1-.4-1-1V3H6c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1z"
                fill="#000"
            />
            <mask
                id="UploadFile_svg__a"
                maskUnits="userSpaceOnUse"
                x={3}
                y={1}
                width={18}
                height={22}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.9 8.6a.523.523 0 01-.1-.15c-.025-.05-.05-.1-.1-.15l-7-7c-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.4-.1H6C4.3 1 3 2.3 3 4v16c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3V9c0-.1 0-.3-.1-.4zM14 4.4L17.6 8H14V4.4zM6 21h12c.6 0 1-.4 1-1V10h-6c-.6 0-1-.4-1-1V3H6c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#UploadFile_svg__a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0h24v24H0V0z"
                    fill="#454545"
                />
            </g>
            <path
                d="M15.42 14.52c-.12.12-.24.18-.42.18s-.3-.06-.42-.18l-1.98-1.98v6.36c0 .36-.24.6-.6.6s-.6-.24-.6-.6v-6.36l-1.98 1.98a.58.58 0 01-.84 0 .58.58 0 010-.84l3-3c.06-.06.12-.12.18-.12.12-.06.3-.06.48 0 .06.06.12.06.18.12l3 3c.24.24.24.6 0 .84z"
                fill="#000"
            />
            <mask
                id="UploadFile_svg__b"
                maskUnits="userSpaceOnUse"
                x={8}
                y={10}
                width={8}
                height={10}
            >
                <path
                    d="M15.42 14.52c-.12.12-.24.18-.42.18s-.3-.06-.42-.18l-1.98-1.98v6.36c0 .36-.24.6-.6.6s-.6-.24-.6-.6v-6.36l-1.98 1.98a.58.58 0 01-.84 0 .58.58 0 010-.84l3-3c.06-.06.12-.12.18-.12.12-.06.3-.06.48 0 .06.06.12.06.18.12l3 3c.24.24.24.6 0 .84z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#UploadFile_svg__b)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.8 8.7h14.4v14.4H4.8V8.7z"
                    fill="#454545"
                />
            </g>
        </svg>
    );
}

export default SvgUploadFile;
