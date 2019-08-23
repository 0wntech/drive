import React from 'react';
import styles from './SearchDropdown.module.css';

import Select from 'react-select';

export default function SearchDropdown({ items, formatOptionLabel }) {
    return (
        <div className={styles.container}>
            <Select
                defaultValue={items[0]}
                formatOptionLabel={formatOptionLabel}
                options={items}
            />
        </div>
    );
}
