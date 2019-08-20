import React from 'react';
import styles from './SearchDropdown.module.css';
export default function SearchDropdown({ items }) {
    console.log(items);
    return (
        <div className={styles.container}>
            <input className={styles.input} type="text" list="items" />
            <datalist id="items">
                {items.map((item, key) => (
                    <option value={item} key={key} />
                ))}
            </datalist>
        </div>
    );
}
