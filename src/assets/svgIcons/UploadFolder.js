import * as React from 'react';

function SvgUploadFolder(props) {
    return (
        <svg width={24} height={24} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 5H20c1.7 0 3 1.3 3 3v11c0 1.7-1.3 3-3 3H4c-1.7 0-3-1.3-3-3V5c0-1.7 1.3-3 3-3h5c.3 0 .6.2.8.4L11.5 5zM20 20c.6 0 1-.4 1-1V8c0-.6-.4-1-1-1h-9c-.3 0-.6-.2-.8-.4L8.5 4H4c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h16z"
                fill="#000"
            />
            <mask
                id="UploadFolder_svg__a"
                maskUnits="userSpaceOnUse"
                x={1}
                y={2}
                width={22}
                height={20}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5 5H20c1.7 0 3 1.3 3 3v11c0 1.7-1.3 3-3 3H4c-1.7 0-3-1.3-3-3V5c0-1.7 1.3-3 3-3h5c.3 0 .6.2.8.4L11.5 5zM20 20c.6 0 1-.4 1-1V8c0-.6-.4-1-1-1h-9c-.3 0-.6-.2-.8-.4L8.5 4H4c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h16z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#UploadFolder_svg__a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0h24v24H0V0z"
                    fill="#454545"
                />
            </g>
            <path
                d="M15.42 13.02c-.12.12-.24.18-.42.18s-.3-.06-.42-.18l-1.98-1.98v6.36c0 .36-.24.6-.6.6s-.6-.24-.6-.6v-6.36l-1.98 1.98a.58.58 0 01-.84 0 .58.58 0 010-.84l3-3c.06-.06.12-.12.18-.12.12-.06.3-.06.48 0 .06.06.12.06.18.12l3 3c.24.24.24.6 0 .84z"
                fill="#000"
            />
            <mask
                id="UploadFolder_svg__b"
                maskUnits="userSpaceOnUse"
                x={8}
                y={9}
                width={8}
                height={9}
            >
                <path
                    d="M15.42 13.02c-.12.12-.24.18-.42.18s-.3-.06-.42-.18l-1.98-1.98v6.36c0 .36-.24.6-.6.6s-.6-.24-.6-.6v-6.36l-1.98 1.98a.58.58 0 01-.84 0 .58.58 0 010-.84l3-3c.06-.06.12-.12.18-.12.12-.06.3-.06.48 0 .06.06.12.06.18.12l3 3c.24.24.24.6 0 .84z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#UploadFolder_svg__b)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.8 7.2h14.4v14.4H4.8V7.2z"
                    fill="#454545"
                />
            </g>
        </svg>
    );
}

export default SvgUploadFolder;
