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
    toggleSelectionMode,
} from '../../actions/appActions';

const ItemList = ({
    webId,
    clipboard,
    currentPath,
    selectedItems,
    selectionMode,
    toggleSelectionMode,
    items,
    image,
    onItemClick,
    isFile,
    setSelection,
    copyItems,
    pasteItems,
    openConsentWindow,
    openRenameWindow,
    noSelect,
}) => {
    const [mouseHoldTimer, setMouseHoldTimer] = useState(null);
    const [longPressed, setLongPressed] = useState(false);

    // Event Handlers
    const handleMouseDown = (item) => {
        if (!selectionMode) {
            setMouseHoldTimer(
                setTimeout(() => {
                    if (!selectedItems.includes(item)) {
                        setSelection([...selectedItems, item]);
                        setLongPressed(true);
                        toggleSelectionMode();
                    }
                }, 1000)
            );
        }
    };

    const handleMouseUp = () => {
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
        // {
        //     label: 'Manage Access',
        //     onClick: (item) => fileUtils.changeAccess(item),
        //     disabled: false,
        // },
        // {
        //     label: 'Share*',
        //     onClick: (item) => fileUtils.changeAccess(item),
        //     disabled: true,
        // },
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
              const itemPath = decodeURIComponent(
                  item.url ? item.url : currentPath + item.name
              );

              return isFile ? (
                  <File
                      selectedItem={
                          selectedItems.includes(itemPath)
                              ? true && !noSelect
                              : undefined
                      }
                      key={item + index}
                      image={image}
                      webId={webId}
                      contextMenuOptions={CONTEXTMENU_OPTIONS}
                      file={item}
                      onClick={(e) => {
                          if (!longPressed) {
                              onItemClick(itemPath, e);
                          } else {
                              setLongPressed(false);
                          }
                      }}
                      onMouseUp={(e) => handleMouseUp(itemPath, e)}
                      onMouseDown={() => handleMouseDown(itemPath)}
                  />
              ) : (
                  <Item
                      selectedItem={
                          selectedItems.includes(itemPath)
                              ? true && !noSelect
                              : undefined
                      }
                      webId={webId}
                      key={item + index}
                      image={image}
                      contextMenuOptions={CONTEXTMENU_OPTIONS}
                      item={item}
                      onClick={(e) => {
                          if (!longPressed) {
                              onItemClick(itemPath, e);
                          } else {
                              setLongPressed(false);
                          }
                      }}
                      onMouseUp={(e) => handleMouseUp(itemPath, e)}
                      onMouseDown={() => handleMouseDown(itemPath)}
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
        selectionMode: state.app.selectionMode,
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
    toggleSelectionMode,
})(ItemList);
