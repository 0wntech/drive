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
    currentPath,
    image,
    selectedItem,
}) {
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
                    currentPath={currentPath}
                    image={image}
                    file={file}
                />
                <div className={styles.labelContainer}>
                    <div className={styles.label}>
                        {decodeURIComponent(file.name)}
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
