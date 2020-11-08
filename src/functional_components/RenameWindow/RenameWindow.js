import React, { useState } from 'react';
import { Window } from '../Window';
import styles from './RenameWindow.module.scss';
import utils from '../../utils/fileUtils';
import ActionButton from '../ActionButton/ActionButton';

export default function RenameWindow({
    onSubmit, // function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    placeholder,
    visible,
    currentItem,
}) {
    const [newName, setNewName] = useState('');

    const {
        fileSuffix,
        placeholder: cleanPlaceholder,
    } = utils.getSuffixAndPlaceholder(placeholder);

    const allow =
        newName && utils.allowFileName(newName, currentItem, fileSuffix);

    return (
        <Window
            windowName={windowName}
            visible={visible}
            onClose={() => {
                setNewName('');
                onClose();
            }}
            className={styles.window}
        >
            <div>
                <p className={styles.prompt}>Enter a new name:</p>
                <p className={styles.description}>
                    Please only use valid characters (A-z, 0-9)
                </p>
                <input
                    data-test-id="rename-resource-input"
                    autoFocus
                    className={styles.input}
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                    placeholder={cleanPlaceholder}
                ></input>
            </div>
            <div className={styles.buttonBar}>
                <ActionButton
                    onClick={() => {
                        if (onCancel) {
                            setNewName('');
                            onCancel();
                        } else {
                            setNewName('');
                            onClose();
                        }
                    }}
                    className={styles.button}
                    label="Cancel"
                    color="white"
                    size="lg"
                />
                <ActionButton
                    dataId="rename-resource-submit"
                    onClick={() => {
                        if (allow) {
                            onSubmit(newName);
                            setNewName('');
                            onClose();
                        }
                    }}
                    className={styles.button}
                    disabled={!allow}
                    color="blue"
                    size="lg"
                    label="Rename"
                />
            </div>
        </Window>
    );
}
