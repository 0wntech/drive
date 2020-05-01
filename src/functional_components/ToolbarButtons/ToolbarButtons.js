import React from 'react';
import classNames from 'classnames';
import styles from './ToolbarButtons.module.scss';
import SvgDownload from '../../assets/svgIcons/Download';
import SvgUpload from '../../assets/svgIcons/Upload';
import SvgTrash from '../../assets/svgIcons/Trash';
import FileUpload from '../FileUpload/FileUpload';
import MoreVertical from '../../assets/svgIcons/MoreVertical';

export default function ToolbarButtons({
    uploadFile,
    onDownload,
    onDelete,
    onMore,
}) {
    return (
        <div className={styles.container}>
            {/* <SvgShare className={styles.toolbarIcon} /> */}
            <SvgDownload className={styles.toolbarIcon} onClick={onDownload} />
            <FileUpload className={styles.toolbarIcon} onChange={uploadFile}>
                <SvgUpload onClick={uploadFile} />
            </FileUpload>
            <SvgTrash className={styles.toolbarIcon} onClick={onDelete} />
            <MoreVertical
                className={classNames(styles.toolbarIcon, styles.more)}
                onClick={onMore}
            />
            {/* <SvgInfo className={styles.toolbarIcon} /> */}
        </div>
    );
}
