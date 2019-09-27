import React from 'react';
import { Window } from '../Window';
import styles from './DeleteWindow.module.css';
import classNames from 'classnames';
import SelectedFile from '../SelectedFile/SelectedFile';

export default function DeleteWindow({
    className,
    selectedItems,
    onSubmit, // requires a function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    info,
}) {
    return (
        <Window windowName={windowName} onClose={onClose} className={className}>
            <p>{info}</p>
            <div className={styles.selectedFiles}>
                {selectedItems.map((item, index) => {
                    return (
                        <SelectedFile
                            fileName={decodeURIComponent(item)}
                            key={index}
                        />
                    );
                })}
            </div>
            <div className={styles.buttonBar}>
                <div
                    onClick={onCancel ? onCancel : onClose}
                    className={styles.button}
                >
                    Cancel
                </div>
                <div
                    onClick={() => {
                        onSubmit(selectedItems);
                        onClose();
                    }}
                    className={classNames(styles.button, styles.confirm)}
                >
                    Delete
                </div>
            </div>
        </Window>
    );
}
