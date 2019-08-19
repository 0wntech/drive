import React from 'react';
import styles from './ImpressumPage.module.css';
import Impressum from '../../functional_components/Impressum';

export default function ImpressumPage() {
    return (
        <div className={styles.container}>
            <Impressum />
        </div>
    );
}
