import React from 'react';
import classNames from 'classnames';
import styles from './ToolbarButtons.module.scss';
import SvgDownload from '../../assets/svgIcons/Download';
import UploadFile from '../../assets/svgIcons/UploadFile';
import UploadFolder from '../../assets/svgIcons/UploadFolder';
import Upload from '../../assets/svgIcons/Upload';
import SvgTrash from '../../assets/svgIcons/Trash';
import FileUpload from '../FileUpload/FileUpload';
import MoreVertical from '../../assets/svgIcons/MoreVertical';
import FolderPlus from '../../assets/svgIcons/FolderPlus';
import useWindowDimension from '../../hooks/useWindowDimension';
import { screen_m as screenM } from '../../styles/constants.scss';

export default function ToolbarButtons({
    onFolderUpload,
    onFileUpload,
    onDownload,
    onDelete,
    onCreateFolder,
    onMore,
}) {
    const { width } = useWindowDimension();
    const buttons = [
        <SvgDownload className={styles.toolbarIcon} onClick={onDownload} />,
        width > screenM ? (
            <FileUpload className={styles.toolbarIcon} onChange={onFileUpload}>
                <UploadFile />
            </FileUpload>
        ) : (
            <FileUpload className={styles.toolbarIcon} onChange={onFileUpload}>
                <Upload />
            </FileUpload>
        ),
        width > screenM ? (
            <FileUpload
                className={styles.toolbarIcon}
                onChange={onFolderUpload}
                folder
            >
                <UploadFolder />
            </FileUpload>
        ) : (
            false
        ),
        <FolderPlus className={styles.toolbarIcon} onClick={onCreateFolder} />,
        <SvgTrash className={styles.toolbarIcon} onClick={onDelete} />,
        <MoreVertical
            className={classNames(styles.toolbarIcon, styles.more)}
            onClick={onMore}
        />,
    ];
    return (
        <div className={styles.container}>
            {/* <SvgShare className={styles.toolbarIcon} /> */}
            {buttons.map(
                (button) =>
                    button && (
                        <div className={styles.buttonWrapper}>{button}</div>
                    )
            )}
            {/* <SvgInfo className={styles.toolbarIcon} /> */}
        </div>
    );
}
