import React, { useState } from 'react';
import { Window } from '../Window';
import styles from './RenameWindow.module.css';
import classNames from 'classnames';
import utils from '../../utils/fileUtils';
import Warning from '../Warning';

export default function RenameWindow({
    className,
    onSubmit, // requires a function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    placeholder,
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
                className={styles.input}
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder={cleanPlaceholder}
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
