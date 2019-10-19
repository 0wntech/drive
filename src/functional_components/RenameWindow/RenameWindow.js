import React, { useState } from 'react';
import { Window } from '../Window';
import styles from './RenameWindow.module.css';
import classNames from 'classnames';
import utils from '../../utils/fileUtils';

export default function RenameWindow({
    className,
    onSubmit, // requires a function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    placeholder,
    currentFolder,
}) {
    let fileSuffix;
    placeholder = placeholder.split('/');
    if (placeholder[placeholder.length - 1] === '') {
        placeholder = placeholder[placeholder.length - 2];
    } else {
        const fileNameFragments = placeholder[placeholder.length - 1].split(
            '.'
        );
        placeholder = fileNameFragments[0];
        fileSuffix = fileNameFragments[1];
    }

    const [newName, setNewName] = useState('');
    const newFileName = `${newName}.${fileSuffix}`;

    const re = new RegExp('^[a-zA-Z0-9]*$');
    const allow = re.exec(newName) && newName !== '' ? true : false;

    const warning = utils.namingConflict(newFileName, currentFolder);
    console.log(warning);

    return (
        <Window
            windowName={windowName}
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
                <p className={classNames(styles.description, styles.warning)}>
                    A file or folder named {newFileName} already exists.
                    Renaming will replace the already existing resource.
                </p>
            ) : null}
            <input
                className={styles.input}
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder={placeholder}
            ></input>
            <div className={styles.buttonBar}>
                <div
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
                >
                    Cancel
                </div>
                <div
                    onClick={() => {
                        if (allow) {
                            onSubmit(newName);
                            setNewName('');
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
