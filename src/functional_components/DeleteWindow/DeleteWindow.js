import React from 'react';
import { Window } from '../Window';
import styles from './DeleteWindow.module.css';
import SelectedFile from '../SelectedFile/SelectedFile';
import ActionButton from '../ActionButton/ActionButton';

export default function DeleteWindow({
    selectedItems,
    onSubmit, // function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    visible,
}) {
    const multiple = selectedItems ? selectedItems.length > 1 : null;

    return (
        <Window
            windowName={windowName}
            onClose={onCancel ? onCancel : onClose}
            visible={visible}
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
                <ActionButton
                    onClick={onCancel ? onCancel : onClose}
                    label="Cancel"
                    color="white"
                    size="lg"
                    className={styles.button}
                />
                <ActionButton
                    onClick={() => {
                        onSubmit(selectedItems);
                        onClose();
                    }}
                    className={styles.button}
                    label="Delete"
                    color="red"
                    sizte="lg"
                />
            </div>
        </Window>
    );
}
