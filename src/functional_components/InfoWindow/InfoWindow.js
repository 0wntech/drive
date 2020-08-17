import React from 'react';
import { connect } from 'react-redux';

import styles from './InfoWindow.module.scss';
import { toggleInfoWindow } from '../../actions/appActions';
import { Window } from '../Window';
import { InfoListItem } from '../InfoListItem/InfoListItem';

export const InfoWindow = ({
    isInfoWindowVisible,
    toggleInfoWindow,
    selectedItems,
    currentPath,
    currentItem,
}) => {
    const items = currentItem
        ? (selectedItems.length > 0
              ? selectedItems
              : [currentPath]
          ).map((item) =>
              [...currentItem.folders, ...currentItem.files].find(
                  (item) => item === item || item === item.name
              )
          )
        : [];

    console.log(items);
    return (
        <Window
            windowName="Info"
            onClose={toggleInfoWindow}
            visible={isInfoWindowVisible}
        >
            <div className={styles.container}>
                {items.map((item) => (
                    <InfoListItem item={item} />
                ))}
            </div>
        </Window>
    );
};

const mapStateToProps = (state) => ({
    currentItem: state.app.currentItem,
    currentPath: state.app.currentPath,
    selectedItems: state.app.selectedItems,
    isInfoWindowVisible: state.app.isInfoWindowVisible,
});

export default connect(mapStateToProps, { toggleInfoWindow })(InfoWindow);
