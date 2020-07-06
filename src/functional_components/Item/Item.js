import React from 'react';
import classNames from 'classnames';
import styles from './Item.module.scss';
import 'react-contexify/dist/ReactContexify.min.css';
import DriveContextMenu from '../DriveContextMenu/DriveContextMenu';

const MyItem = ({
    image,
    label,
    onClick,
    onMouseUp,
    onMouseDown,
    selectedItem,
}) => {
    return (
        <DriveContextMenu
            className={classNames(styles.gridCell, {
                [styles.selected]: selectedItem,
            })}
            item={label}
        >
            <div
                className={classNames(styles.container)}
                data-test-id={`item-${label}`}
                onClick={onClick}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onTouchEnd={onMouseUp}
                onTouchStart={onMouseDown}
            >
                <div className={styles.innerContainer}>
                    <div
                        alt="item"
                        className={styles.icon}
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        <img
                            src={image}
                            style={{ visibility: 'hidden' }}
                            className={styles.icon}
                        />
                    </div>
                </div>
                <div className={styles.labelContainer}>
                    <div className={styles.label}>{label}</div>
                </div>
            </div>
        </DriveContextMenu>
    );
};

export default MyItem;
