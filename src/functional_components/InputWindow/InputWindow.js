import React, { useState } from 'react';
import { Window } from '../Window';
import styles from './InputWindow.module.scss';
import ActionButton from '../ActionButton/ActionButton';
import utils from '../../utils/fileUtils.js';

export default function CreateWindow({
    onSubmit, // function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    info,
    placeholder,
    visible,
    currentItem,
}) {
    const [value, setValue] = useState('');
    const allow = utils.allowFileName(value, currentItem);
    return (
        <Window
            visible={visible}
            windowName={windowName}
            onClose={onClose}
            className={styles.window}
        >
            <div>
                <p>{info}</p>
                <input
                    className={styles.input}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder={placeholder}
                    autoFocus
                ></input>
            </div>
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
                    disabled={!allow}
                    size="lg"
                    color="green"
                    label="Confirm"
                />
            </div>
        </Window>
    );
}
