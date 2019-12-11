import React from 'react';
import styles from './File.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Menu, MenuProvider, Item } from 'react-contexify';
export default function File({
    currPath,
    onClick,
    image,
    label,
    selectedItem,
    contextMenuOptions,
}) {
    const imageTypes = ['ico', 'png', 'jpeg', 'jpg'];
    const labelFragments = encodeURIComponent(label).split('.');
    const isImage =
        imageTypes.indexOf(labelFragments[labelFragments.length - 1]) > -1;

    const renderFile = () => {
        if (isImage) {
            return (
                <div className={styles.innerContainer}>
                    <div className={styles.iconContainer}>
                        <img
                            alt="file"
                            className={styles.thumbnail}
                            src={currPath + label}
                        />
                        <img alt="file" className={styles.icon} src={image} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.innerContainer} data-test-id={label}>
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
            id={label + 'contextmenu'}
        >
            <div
                className={styles.container}
                style={selectedItem ? { opacity: 0.5 } : undefined}
                onClick={onClick}
            >
                {renderFile()}
            </div>
            <div className={styles.label}>{label}</div>
            <Menu className={styles.contextMenu} id={label + 'contextmenu'}>
                {contextMenuOptions &&
                    contextMenuOptions.map((option, index) => (
                        <Item
                            disabled={option.disabled}
                            key={index + option.label}
                            onClick={
                                !option.disabled
                                    ? () => {
                                          option.onClick(currPath + label);
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
    currPath: PropTypes.string,
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
