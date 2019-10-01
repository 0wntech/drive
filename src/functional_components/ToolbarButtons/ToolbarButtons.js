import React from 'react';

import styles from './ToolbarButtons.module.css';
import SvgShare from '../../assets/svgIcons/Share';
import SvgDownload from '../../assets/svgIcons/Download';
import SvgUpload from '../../assets/svgIcons/Upload';
import SvgTrash from '../../assets/svgIcons/Trash';
import SvgInfo from '../../assets/svgIcons/Info';
import FileUpload from '../FileUpload/FileUpload';

export default function ToolbarButtons({ uploadFile, onDownload, onDelete }) {
    return (
        <div className={styles.container}>
            <SvgShare className={styles.toolbarIcon} />
            <SvgDownload className={styles.toolbarIcon} onClick={onDownload} />
            <FileUpload onChange={uploadFile}>
                <SvgUpload
                    className={styles.toolbarIcon}
                    onClick={uploadFile}
                />
            </FileUpload>
            <SvgTrash className={styles.toolbarIcon} onClick={onDelete} />
            <SvgInfo className={styles.toolbarIcon} />
        </div>
    );
}
