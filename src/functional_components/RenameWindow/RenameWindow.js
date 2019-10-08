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
    placeholder = placeholder.split('/');
    if (placeholder[placeholder.length - 1] === '') {
        placeholder = placeholder[placeholder.length - 2];
    } else {
        placeholder = placeholder[placeholder.length - 1].split('.')[0];
    }

    const [value, setValue] = useState('');
    const re = new RegExp('^[a-zA-Z0-9]*$');
    const allow = re.exec(value) && value !== '' ? true : false;

    return (
        <Window
            windowName={windowName}
            onClose={() => {
                setValue('');
                onClose();
            }}
            className={className}
        >
            <p className={styles.prompt}>Enter a new name:</p>
            <p className={styles.description}>
                Please only use valid characters (A-z, 0-9)
            </p>
            <input
                className={styles.input}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
            ></input>
            <div className={styles.buttonBar}>
                <div
                    onClick={() => {
                        if (onCancel) {
                            setValue('');
                            onCancel();
                        } else {
                            setValue('');
                            onClose();
                        }
                    }}
                    className={styles.button}
                >
                    Cancel
                </div>
                <div
                    onClick={() => {
                        if (allow) {
                            onSubmit(value);
                            setValue('');
                            onClose();
                        }
                    }}
                    className={classNames(styles.button, styles.confirm, {
                        [styles.disabled]: !allow,
                    })}
                >
                    Rename
                </div>
            </div>
        </Window>
    );
}
