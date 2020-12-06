import * as React from 'react';

function SvgSubtract(props) {
    return (
        <svg width={40} height={36} fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.716.99c-.763-1.32-2.67-1.32-3.432 0L.268 32.196c-.762 1.32.191 2.972 1.716 2.972h36.032c1.525 0 2.478-1.651 1.716-2.972L21.716.99zm.76 10.567v-1.155a2.477 2.477 0 10-4.952 0v1.155l1.208 12.388a1.274 1.274 0 002.536 0l1.209-12.388zM17.69 29.713v-.33a2.311 2.311 0 114.623 0v.33a2.311 2.311 0 11-4.623 0z"
                fill="#E2E2E6"
            />
            <desc>{props['aria-label']}</desc>
        </svg>
    );
}

export default SvgSubtract;
