import React from 'react';
import styles from './File.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import mime from 'mime';
import { isImageType } from '../../utils/fileUtils';
import linkedFileImage from '../../assets/icons/shared_file.png';
import DriveContextMenu from '../DriveContextMenu/DriveContextMenu';

export default function File({
    currentPath,
    onClick,
    onMouseUp,
    onMouseDown,
    image,
    file,
    selectedItem,
}) {
    const isImage = isImageType(file.type);

    const renderFile = () => {
        if (isImage) {
            return (
                <div className={styles.innerContainer}>
                    <div className={styles.iconContainer}>
                        <img
                            alt="file"
                            className={styles.thumbnail}
                            src={currentPath + file.name}
                            loading="lazy"
                        />
                        <div
                            alt="file"
                            className={styles.icon}
                            style={{ backgroundImage: `url(${image})` }}
                        >
                            <img
                                src={image}
                                style={{ visibility: 'hidden' }}
                                className={styles.icon}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className={styles.innerContainer}
                    data-test-id={`file-${file.name}`}
                >
                    {file.type ? (
                        file.type === 'rdf' ? (
                            <img
                                src={linkedFileImage}
                                className={styles.linkedFile}
                            />
                        ) : (
                            <p className={styles.fileType}>
                                {mime.getExtension(file.type) === 'markdown'
                                    ? 'md'
                                    : mime.getExtension(file.type)}
                            </p>
                        )
                    ) : null}
                    <div
                        alt="file"
                        className={styles.icon}
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        <img
                            src={image}
                            style={{ visibility: 'hidden' }}
                            className={styles.icon}
                        />
                    </div>
                </div>
            );
        }
    };

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
                {renderFile()}
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
