import React from 'react';
import styles from '../SelectedFile/SelectedFile.module.scss';
import fileIcon from '../../assets/icons/FileIconSm.png';
import folderIcon from '../../assets/icons/FolderSm.png';

export default function SelectedFile({ item }) {
    const fileFragments = item.split('/');
    const file = !item.endsWith('/');
    const label = file
        ? fileFragments[fileFragments.length - 1]
        : fileFragments[fileFragments.length - 2];
    return (
        <div className={styles.container}>
            <div className={styles.listing}>
                {file ? (
                    <img alt="file" src={fileIcon} />
                ) : (
                    <img alt="folder" src={folderIcon} />
                )}
                <div className={styles.labelText}>{label}</div>
            </div>
        </div>
    );
}
