import React, { useState } from 'react';
import { Window } from '../Window';
import styles from './InputWindow.module.css';
import classNames from 'classnames';

export default function CreateWindow({
    className,
    onSubmit, // requires a function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    info,
    placeholder,
}) {
    const [value, setValue] = useState('');
    return (
        <Window windowName={windowName} onClose={onClose} className={className}>
            <p>{info}</p>
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
                    Confirm
                </div>
            </div>
        </Window>
    );
}
