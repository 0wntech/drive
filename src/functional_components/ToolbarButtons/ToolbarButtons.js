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
import { screen_l as screenL } from '../../styles/constants.scss';

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
        <SvgDownload
            key={'SvgDownload'}
            className={styles.toolbarIcon}
            onClick={onDownload}
        />,
        width > screenL ? (
            <FileUpload
                key={'FileUpload'}
                className={styles.toolbarIcon}
                onChange={onFileUpload}
            >
                <UploadFile />
            </FileUpload>
        ) : (
            <FileUpload
                key={'FileUpload'}
                className={styles.toolbarIcon}
                onChange={onFileUpload}
            >
                <Upload />
            </FileUpload>
        ),
        width > screenL ? (
            <FileUpload
                key={'FolderUpload'}
                className={styles.toolbarIcon}
                onChange={onFolderUpload}
                folder
            >
                <UploadFolder />
            </FileUpload>
        ) : (
            false
        ),
        <FolderPlus
            key={'CreateFolder'}
            className={styles.toolbarIcon}
            onClick={onCreateFolder}
        />,
        <SvgTrash
            key={'Delete'}
            className={styles.toolbarIcon}
            onClick={onDelete}
        />,
        <MoreVertical
            key={'More'}
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
                        <div className={styles.buttonWrapper} key={button.key}>{button}</div>
                    )
            )}
            {/* <SvgInfo className={styles.toolbarIcon} /> */}
        </div>
    );
}
