import React from 'react';
import classNames from 'classnames';
import styles from './FileEditor.module.scss';

export const FileEditor = ({ value, onChange, placeholder, edit }) => {
    return (
        <textarea
            autoFocus
            className={classNames(styles.editor, {
                [styles.enabled]: edit,
            })}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};
