import React, { useState } from 'react';
import { connect } from 'react-redux';
import fileUtils from '../../utils/fileUtils';
import { getRootFromWebId } from '../../utils/url';
import { Item } from '../Item';
import styles from './ItemList.module.scss';
import { File } from '../File';
import {
    setSelection,
    copyItems,
    pasteItems,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    openRenameWindow,
} from '../../actions/appActions';

const ItemList = ({
    webId,
    clipboard,
    currentPath,
    selectedItems,
    items,
    image,
    onItemClick,
    isFile = false,
    setSelection,
    copyItems,
    pasteItems,
    openConsentWindow,
    openRenameWindow,
}) => {
    const [mouseHoldTimer, setMouseHoldTimer] = useState(null);

    // Event Handlers
    const handleMouseDown = (item) => {
        setMouseHoldTimer(
            setTimeout(() => {
                if (!selectedItems.includes(item)) {
                    setSelection([...selectedItems, item]);
                } else {
                    setSelection(
                        selectedItems.filter(
                            (selectedItem) => selectedItem !== item
                        )
                    );
                }
            }, 1000)
        );
    };

    const handleMouseUp = (item, event) => {
        console.log(mouseHoldTimer);
        if (!selectedItems.includes(item)) {
            onItemClick(item, event);
        }
        clearTimeout(mouseHoldTimer);
    };

    const CONTEXTMENU_OPTIONS = [
        {
            label: 'Info',
            onClick: (item) => fileUtils.getInfo(item),
            disabled: false,
        },
        {
            label: 'Copy*',
            onClick: (item) => {
                if (
                    !selectedItems.includes(item) &&
                    item !== getRootFromWebId(webId)
                ) {
                    selectedItems.push(item);
                }
                copyItems(selectedItems);
            },
            disabled: false,
        },
        {
            label: 'Paste*',
            onClick: () => pasteItems(clipboard, currentPath),
            disabled: clipboard && clipboard.length === 0,
        },
        {
            label: 'Rename',
            onClick: (item) => openRenameWindow(item),
            disabled: false,
        },
        {
            label: 'Manage Access',
            onClick: (item) => fileUtils.changeAccess(item),
            disabled: false,
        },
        {
            label: 'Share*',
            onClick: (item) => fileUtils.changeAccess(item),
            disabled: true,
        },
        {
            label: 'Delete',
            onClick: (item) => {
                const deletable = fileUtils.addForDelete(item, selectedItems);
                if (deletable && deletable.length !== 0) {
                    setSelection(deletable);
                    openConsentWindow(deletable);
                }
            },
            disabled: false,
        },
    ];

    const itemComponents = items
        ? items.map((item, index) => {
              return isFile ? (
                  <File
                      selectedItem={
                          selectedItems.includes(currentPath + item.name)
                              ? true
                              : undefined
                      }
                      key={item + index}
                      image={image}
                      contextMenuOptions={CONTEXTMENU_OPTIONS}
                      file={item}
                      currentPath={currentPath}
                      onMouseUp={(e) =>
                          handleMouseUp(currentPath + item.name, e)
                      }
                      onMouseDown={() =>
                          handleMouseDown(currentPath + item.name)
                      }
                  />
              ) : (
                  <Item
                      selectedItem={
                          selectedItems.includes(currentPath + item + '/')
                              ? true
                              : undefined
                      }
                      key={item + index}
                      image={image}
                      contextMenuOptions={CONTEXTMENU_OPTIONS}
                      currentPath={currentPath}
                      label={decodeURIComponent(item)}
                      onMouseUp={(e) =>
                          handleMouseUp(currentPath + item + '/', e)
                      }
                      onMouseDown={() =>
                          handleMouseDown(currentPath + item + '/')
                      }
                  />
              );
          })
        : undefined;

    return <div className={styles.listContainer}>{itemComponents}</div>;
};

const mapStateToProps = (state) => {
    return {
        webId: state.user.webId,
        clipboard: state.app.clipboard,
        currentPath: state.app.currentPath,
        selectedItems: state.app.selectedItems,
    };
};

export default connect(mapStateToProps, {
    setSelection,
    copyItems,
    pasteItems,
    openRenameWindow,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
})(ItemList);
