import React from 'react';
import { Window } from '../Window';
import styles from './ErrorWindow.module.scss';

export default function ErrorWindow({ onClose, visible, error, windowName }) {
    return (
        <Window
            visible={visible}
            windowName={windowName}
            onClose={onClose}
            className={styles.window}
            containerClassName={styles.container}
        >
            {error && (
                <div data-test-id="file-error-message" className={styles.error}>
                    {error.message}
                </div>
            )}
        </Window>
    );
}
