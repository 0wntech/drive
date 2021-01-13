import React from 'react';
import { Window } from '../Window';
import styles from './DeleteWindow.module.scss';
import SelectedFile from '../SelectedFile/SelectedFile';
import ActionButton from '../ActionButton/ActionButton';

export default function DeleteWindow({
    selectedItems,
    onSubmit, // function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    visible,
}) {
    const multiple = selectedItems?.length > 1;

    return (
        <Window
            windowName={multiple ? 'Delete Items' : 'Delete Item'}
            onClose={onCancel ? onCancel : onClose}
            visible={visible}
            className={styles.window}
        >
            <div className={styles.body}>
                <p className={styles.prompt}>
                    <p className={styles.description}>
                        If you copied{' '}
                        {multiple ? 'some of these items' : 'this item'} before,
                        deleting {multiple ? 'them' : 'it'} will make{' '}
                        {multiple ? 'them' : 'it'} unavailable for pasting.
                    </p>
                </p>
                <div className={styles.selectedFiles}>
                    {selectedItems
                        ? selectedItems.map((item, index) => {
                              return (
                                  <SelectedFile
                                      item={decodeURIComponent(item)}
                                      key={index}
                                  />
                              );
                          })
                        : null}
                </div>
            </div>
            <div className={styles.buttonBar}>
                <ActionButton
                    onClick={onCancel ? onCancel : onClose}
                    label="Cancel"
                    type="secondary"
                    size="lg"
                    className={styles.button}
                />
                <ActionButton
                    dataId="delete-resource-submit"
                    onClick={() => {
                        onSubmit(selectedItems);
                        onClose();
                    }}
                    className={styles.button}
                    label="Delete"
                    type="danger"
                    size="lg"
                />
            </div>
        </Window>
    );
}
