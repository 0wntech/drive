import React, { useState } from 'react';
import { Window } from '../Window';
import styles from './RenameWindow.module.css';
import utils from '../../utils/fileUtils';
import Warning from '../Warning';
import ActionButton from '../ActionButton/ActionButton';

export default function RenameWindow({
    className,
    onSubmit, // function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    placeholder,
    visible,
    currentFolder,
}) {
    const [newName, setNewName] = useState('');

    const {
        fileSuffix,
        placeholder: cleanPlaceholder,
    } = utils.getSuffixAndPlaceholder(placeholder);
    const newFileName = fileSuffix ? `${newName}.${fileSuffix}` : newName;

    let allow;
    let warning;
    if (newName !== cleanPlaceholder) {
        const re = new RegExp('^[a-zA-Z0-9]*$');
        allow = re.exec(newName) && newName !== '' ? true : false;
        warning = utils.namingConflict(newFileName, currentFolder);
    } else {
        allow = false;
        warning = false;
    }

    return (
        <Window
            windowName={windowName}
            visible={visible}
            onClose={() => {
                setNewName('');
                onClose();
            }}
            className={className}
        >
            <p className={styles.prompt}>Enter a new name:</p>
            <p className={styles.description}>
                Please only use valid characters (A-z, 0-9)
            </p>
            {warning ? (
                <Warning
                    message={
                        'A file or folder named ' +
                        newFileName +
                        ' already exists. Renaming will replace the already existing resource.'
                    }
                />
            ) : null}
            <input
                autoFocus
                className={styles.input}
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder={cleanPlaceholder}
            ></input>
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
                    onClick={() => {
                        if (allow) {
                            onSubmit(newName);
                            setNewName('');
                            onClose();
                        }
                    }}
                    className={styles.button}
                    disabled={!allow}
                    color="green"
                    size="lg"
                    label="Rename"
                />
            </div>
        </Window>
    );
}
