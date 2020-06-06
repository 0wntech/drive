import React from 'react';
import styles from './File.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Menu, MenuProvider, Item } from 'react-contexify';
import mime from 'mime';
import { isImageType } from '../../utils/fileUtils';
import linkedFileImage from '../../assets/icons/shared_file.png';

export default function File({
    currentPath,
    onClick,
    onMouseUp,
    onMouseDown,
    image,
    file,
    selectedItem,
    contextMenuOptions,
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
                        />
                        <img alt="file" className={styles.icon} src={image} />
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
                                {mime.getExtension(file.type)}
                            </p>
                        )
                    ) : null}
                    <img alt="file" className={styles.icon} src={image} />
                </div>
            );
        }
    };

    return (
        <MenuProvider
            className={classNames(styles.gridCell, {
                [styles.selected]: selectedItem,
            })}
            id={file.name + 'contextmenu'}
        >
            <div
                className={styles.container}
                onClick={onClick}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onTouchEnd={onMouseUp}
                onTouchStart={onMouseDown}
                data-test-id={`file-${file.name}`}
            >
                {renderFile()}
                <div className={styles.labelContainer}>
                    <div className={styles.label}>{file.name}</div>
                </div>
            </div>
            <Menu className={styles.contextMenu} id={file.name + 'contextmenu'}>
                {contextMenuOptions &&
                    contextMenuOptions.map((option, index) => (
                        <Item
                            disabled={option.disabled}
                            key={index + option.label}
                            onClick={
                                !option.disabled
                                    ? () => {
                                          option.onClick(
                                              currentPath + file.name
                                          );
                                      }
                                    : undefined
                            }
                            className={classNames(styles.contextItem, {
                                [styles.disabled]: option.disabled,
                            })}
                        >
                            <div>{option.label}</div>
                        </Item>
                    ))}
            </Menu>
        </MenuProvider>
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
