import React from 'react';
import styles from '../SelectedFile/SelectedFile.module.css';
import fileIcon from '../../assets/icons/File.png';
import folderIcon from '../../assets/icons/Folder.png';

export default function SelectedFile({ fileName }) {
    const labelFragments = fileName.split('/');
    const file = !fileName.endsWith('/');
    const label = file
        ? labelFragments[labelFragments.length - 1]
        : labelFragments[labelFragments.length - 2];
    return (
        <div className={styles.container}>
            <div className={styles.listing}>
                {file ? <img src={fileIcon} /> : <img src={folderIcon} />}
                <div className={styles.label}>{label}</div>
            </div>
        </div>
    );
}
