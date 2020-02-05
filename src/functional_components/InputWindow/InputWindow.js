import React, { useState } from 'react';
import { Window } from '../Window';
import styles from './InputWindow.module.css';
import ActionButton from '../ActionButton/ActionButton';

export default function CreateWindow({
    onSubmit, // function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    info,
    placeholder,
    visible,
}) {
    const [value, setValue] = useState('');
    return (
        <Window visible={visible} windowName={windowName} onClose={onClose}>
            <p>{info}</p>
            <input
                className={styles.input}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
                autoFocus
            ></input>
            <div className={styles.buttonBar}>
                <ActionButton
                    onClick={onCancel ? onCancel : onClose}
                    className={styles.button}
                    color="white"
                    label="Cancel"
                    size="lg"
                />
                <ActionButton
                    className={styles.button}
                    onClick={() => {
                        onSubmit(value);
                        onClose();
                    }}
                    disabled={value === ''}
                    size="lg"
                    color="green"
                    label="Confirm"
                />
            </div>
        </Window>
    );
}
