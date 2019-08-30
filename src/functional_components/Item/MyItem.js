import React from 'react';
import { Menu, Separator, MenuProvider, Item } from 'react-contexify';
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
            {console.log(selectedItem)}
            <div className={classNames(styles.container)} onClick={onClick}>
                <div className={styles.innerContainer}>
                    <img className={styles.icon} src={image} />
                </div>
                <div className={styles.label}>{label}</div>
            </div>
            <Menu className={styles.contextMenu} id={label + 'contextmenu'}>
                <Item
                    onClick={() => {
                        onDelete(
                            currPath + encodeURIComponent(label),
                            'folder'
                        );
                    }}
                >
                    <div className={styles.contextItem}>Delete</div>
                </Item>
                <Item
                    onClick={() => {
                        onInfo(currPath + encodeURIComponent(label), 'folder');
                    }}
                >
                    <div className={styles.contextItem}>Info</div>
                </Item>
                <Item
                    onClick={() => {
                        onAccess(
                            currPath + encodeURIComponent(label),
                            'folder'
                        );
                    }}
                >
                    <div className={styles.contextItem}>Access</div>
                </Item>
                <Item
                    onClick={() => {
                        onRename(
                            currPath + encodeURIComponent(label),
                            'folder'
                        );
                    }}
                >
                    <div className={styles.contextItem}>Rename</div>
                </Item>
                <Separator />
                <Item
                    onClick={() => {
                        onRename(label);
                    }}
                >
                    <div className={styles.contextItem}>Rename</div>
                </Item>
            </Menu>
        </MenuProvider>
    );
};

export default MyItem;
