import React from 'react';
import { Menu, MenuProvider, Item } from 'react-contexify';
import classNames from 'classnames';
import styles from './Item.module.css';
import 'react-contexify/dist/ReactContexify.min.css';

const MyItem = ({
    image,
    label,
    onClick,
    contextMenuOptions,
    selectedItem,
    currPath,
}) => {
    return (
        <MenuProvider
            className={classNames(styles.gridCell, {
                [styles.selected]: selectedItem,
            })}
            id={label + 'contextmenu'}
        >
            <div className={classNames(styles.container)} onClick={onClick}>
                <div className={styles.innerContainer}>
                    <img className={styles.icon} src={image} />
                </div>
                <div className={styles.label}>{label}</div>
            </div>
            <Menu className={styles.contextMenu} id={label + 'contextmenu'}>
                {contextMenuOptions &&
                    contextMenuOptions.map((option, index) => (
                        <Item
                            disabled={option.disabled}
                            key={index + option.label}
                            onClick={
                                !option.disabled
                                    ? () => {
                                          option.onClick(
                                              currPath + label + '/'
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
};

export default MyItem;
