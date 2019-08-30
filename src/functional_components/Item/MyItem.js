import React from 'react';
import { Menu, MenuProvider, Item } from 'react-contexify';
import classNames from 'classnames';
import styles from './Item.module.css';
import 'react-contexify/dist/ReactContexify.min.css';

const MyItem = ({
    image,
    label,
    onClick,
    onDelete,
    onAccess,
    onRename,
    onInfo,
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
                <Item
                    onClick={() => {
                        onInfo(currPath + encodeURIComponent(label), 'folder');
                    }}
                    className={styles.contextItem}
                >
                    <div>Info</div>
                </Item>
                <Item
                    className={styles.contextItem}
                    onClick={() => {
                        onRename(label);
                    }}
                >
                    <div>Copy*</div>
                </Item>
                <Item
                    className={styles.contextItem}
                    onClick={() => {
                        onRename(label);
                    }}
                >
                    <div>Paste*</div>
                </Item>
                <Item
                    className={styles.contextItem}
                    onClick={() => {
                        onRename(
                            currPath + encodeURIComponent(label),
                            'folder'
                        );
                    }}
                >
                    <div>Rename</div>
                </Item>
                <Item
                    className={styles.contextItem}
                    onClick={() => {
                        onAccess(
                            currPath + encodeURIComponent(label),
                            'folder'
                        );
                    }}
                >
                    <div>Manage Access</div>
                </Item>
                <Item
                    className={styles.contextItem}
                    onClick={() => {
                        onDelete(
                            currPath + encodeURIComponent(label),
                            'folder'
                        );
                    }}
                >
                    <div className={styles.itemLabel}>Share*</div>
                </Item>
                <Item
                    className={styles.contextItem}
                    onClick={() => {
                        onDelete(
                            currPath + encodeURIComponent(label),
                            'folder'
                        );
                    }}
                >
                    <div className={styles.itemLabel}>Delete</div>
                </Item>
            </Menu>
        </MenuProvider>
    );
};

export default MyItem;
