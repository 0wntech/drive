import React from 'react';
import { Item } from '../Item';
import styles from './ItemList.module.css';
import { File } from '../File';

const ItemList = ({
    selectedItems,
    items,
    image,
    onItemClick,
    currPath,
    isFile = false,
    onDelete,
    onAccess,
    onRename,
    onInfo,
    contextMenuOptions,
}) => {
    const itemComponents = items
        ? items.map((item, index) => {
              console.log(
                  currPath + encodeURIComponent(item),
                  selectedItems.includes(currPath + encodeURIComponent(item))
              );
              return isFile ? (
                  <File
                      selectedItem={
                          selectedItems.includes(
                              currPath + encodeURIComponent(item)
                          )
                              ? true
                              : undefined
                      }
                      key={item + index}
                      image={image}
                      onClick={(event) => {
                          onItemClick(
                              currPath + encodeURIComponent(item),
                              event
                          );
                      }}
                      contextMenuOptions={contextMenuOptions}
                      label={item}
                      currPath={currPath}
                  />
              ) : (
                  <Item
                      selectedItem={
                          selectedItems.includes(
                              currPath + encodeURIComponent(item)
                          )
                              ? true
                              : undefined
                      }
                      key={item + index}
                      image={image}
                      onClick={(event) =>
                          onItemClick(
                              currPath + encodeURIComponent(item),
                              event
                          )
                      }
                      contextMenuOptions={contextMenuOptions}
                      currPath={currPath}
                      label={item}
                  />
              );
          })
        : undefined;

    return <div className={styles.listContainer}>{itemComponents}</div>;
};

export default ItemList;
