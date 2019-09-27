import React, { useState } from 'react';
import { Window } from '../Window';
import styles from './RenameWindow.module.css';
import classNames from 'classnames';

export default function RenameWindow({
    className,
    onSubmit, // requires a function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    placeholder,
}) {
    const [value, setValue] = useState('');

    placeholder = placeholder.split('/');
    if (placeholder[placeholder.length - 1] === '') {
        placeholder = placeholder[placeholder.length - 2];
    } else {
        placeholder = placeholder[placeholder.length - 1];
    }

    console.log(placeholder);

    return (
        <Window windowName={windowName} onClose={onClose} className={className}>
            <p>Enter a new name:</p>
            <input
                className={styles.input}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
            ></input>
            <div className={styles.buttonBar}>
                <div
                    onClick={onCancel ? onCancel : onClose}
                    className={styles.button}
                >
                    Cancel
                </div>
                <div
                    onClick={() => {
                        onSubmit(value);
                        onClose();
                    }}
                    className={classNames(styles.button, styles.confirm)}
                >
                    Rename
                </div>
            </div>
        </Window>
    );
}
