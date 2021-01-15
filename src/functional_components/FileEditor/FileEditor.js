import React from 'react';
import classNames from 'classnames';
import './FileEditor.scss';
import styles from './FileEditor.module.scss';
import { Controlled as CodeMirror } from 'react-codemirror2';

export const FileEditor = ({
    value,
    onChange,
    placeholder,
    editable,
    dataId,
}) => {
    return (
        <CodeMirror
            data-test-id={dataId ?? 'file-editor'}
            className={classNames(styles.editor, {
                [styles.enabled]: editable,
            })}
            autoScroll={false}
            options={{
                lineNumbers: true,
                readOnly: editable ? false : 'nocursor',
                lineWrapping: true,
                autofocus: editable,
            }}
            value={value}
            onBeforeChange={onChange}
            placeholder={placeholder}
        />
    );
};
