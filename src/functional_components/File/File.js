import React from 'react';
import styles from './File.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DriveContextMenu from '../DriveContextMenu/DriveContextMenu';
import { FileImage } from '../FileImage/FileImage';

export default function File({
    onClick,
    onMouseUp,
    onMouseDown,
    file,
    webId,
    image,
    selectedItem,
}) {
    const fileHost = new URL(file.url)?.host;
    const strangeOrigin =
        webId && file.url && new URL(webId)?.host !== fileHost;
    return (
        <DriveContextMenu
            className={classNames(styles.gridCell, {
                [styles.selected]: selectedItem,
            })}
            item={file}
        >
            <div
                className={styles.container}
                data-test-id={`file-${file.name}`}
                onClick={onClick}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onTouchEnd={onMouseUp}
                onTouchStart={onMouseDown}
            >
                <FileImage
                    currentPath={file.url.substr(
                        0,
                        file.url.lastIndexOf('/') + 1
                    )}
                    image={image}
                    file={file}
                />
                <div className={styles.labelContainer}>
                    <div className={styles.label} data-test-id={`file-label`}>
                        {decodeURIComponent(file.name)}
                        {strangeOrigin && fileHost !== file.name && (
                            <div className={styles.origin}>({fileHost})</div>
                        )}
                    </div>
                </div>
            </div>
        </DriveContextMenu>
    );
}
File.propTypes = {
    currentPath: PropTypes.string,
    onClick: PropTypes.func,
    image: PropTypes.string,
    label: PropTypes.string,
    selectedItem: PropTypes.bool,
    contextMenuOptions: PropTypes.arrayOf(
        PropTypes.shape({
            disabled: PropTypes.bool,
            label: PropTypes.string,
            onClick: PropTypes.func,
        })
    ),
};
