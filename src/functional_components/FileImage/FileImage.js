import React from 'react';
import mime from 'mime';

import styles from './FileImage.module.scss';
import { isImageType } from '../../utils/fileUtils';
import linkedFileImage from '../../assets/icons/shared_file.png';

export const FileImage = ({ currentPath, file, image }) => {
    const isImage = isImageType(file.type);
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
                    file.type === 'text/turtle' ? (
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
