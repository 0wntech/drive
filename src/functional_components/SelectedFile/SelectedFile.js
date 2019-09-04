import React from 'react';
import styles from '../SelectedFile/SelectedFile.module.css';
import fileIcon from '../../assets/icons/File.png';
import folderIcon from '../../assets/icons/Folder.png';

export default function SelectedFile({ fileName }) {
    const labelFragments = fileName.split('/');
    const label = labelFragments[labelFragments.length - 1];
    const file = fileName.endsWith('/');
    return (
        <div className={styles.container}>
            {file ? <img src={fileIcon} /> : <img src={folderIcon} />}
            {label}
        </div>
    );
}
