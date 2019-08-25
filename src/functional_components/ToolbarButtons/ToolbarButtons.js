import React from 'react';
import styles from './ToolbarButtons.module.css';
import shareIcon from '../../assets/icons/share.png';
import downloadIcon from '../../assets/icons/download.png';
import uploadIcon from '../../assets/icons/upload.png';
import trashIcon from '../../assets/icons/trash.png';
import infoIcon from '../../assets/icons/info.png';
import FileUpload from '../FileUpload/FileUpload';

export default function ToolbarButtons({ uploadFile }) {
    return (
        <div className={styles.container}>
            <img className={styles.toolbarIcon} src={shareIcon} />
            <img className={styles.toolbarIcon} src={downloadIcon} />
            <FileUpload onChange={uploadFile}>
                <img
                    className={styles.toolbarIcon}
                    onClick={uploadFile}
                    src={uploadIcon}
                />
            </FileUpload>
            <img className={styles.toolbarIcon} src={trashIcon} />
            <img className={styles.toolbarIcon} src={infoIcon} />
        </div>
    );
}
