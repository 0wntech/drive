import React from 'react';
import classNames from 'classnames';
import styles from './Item.module.scss';
import 'react-contexify/dist/ReactContexify.min.css';
import DriveContextMenu from '../DriveContextMenu/DriveContextMenu';

const MyItem = ({
    webId,
    image,
    item,
    onClick,
    onMouseUp,
    onMouseDown,
    selectedItem,
}) => {
    const itemHost = new URL(item.url)?.host;
    const strangeOrigin =
        webId && itemHost && new URL(webId)?.host !== itemHost;
    return (
        <DriveContextMenu
            className={classNames(styles.gridCell, {
                [styles.selected]: selectedItem,
            })}
            item={item.name}
        >
            <div
                className={classNames(styles.container)}
                data-test-id={`item-${decodeURIComponent(item.name)}`}
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
                    <div className={styles.label} data-test-id={'item-label'}>
                        {decodeURIComponent(item.name)}
                        {strangeOrigin && itemHost !== item.name && (
                            <div className={styles.origin}>({itemHost})</div>
                        )}
                    </div>
                </div>
            </div>
        </DriveContextMenu>
    );
};

export default MyItem;
