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
}) {
    const multiple = selectedItems ? selectedItems.length > 1 : null;

    return (
        <Window
            windowName={windowName}
            onClose={onCancel ? onCancel : onClose}
            className={className}
        >
            <p className={styles.prompt}>
                {multiple
                    ? 'Do you really want to delete these items?'
                    : 'Do you really want to delete this item?'}
            </p>
            <p className={styles.description}>
                If you copied {multiple ? 'some of these items' : 'this item'}{' '}
                before, deleting it will make it unavailable for pasting.
            </p>
            <div className={styles.selectedFiles}>
                {selectedItems
                    ? selectedItems.map((item, index) => {
                          return (
                              <SelectedFile
                                  fileName={decodeURIComponent(item)}
                                  key={index}
                              />
                          );
                      })
                    : null}
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
