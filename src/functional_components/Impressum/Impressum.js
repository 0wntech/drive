import React from 'react';
import styles from './Impressum.module.css';
import COMPANY from './content';
export default function Impressum() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Impressum</h1>
            <div className={styles.block}>
                <p className={styles.text}>{COMPANY.leader.name}</p>
                <p className={styles.text}>{COMPANY.name}</p>
                <p className={styles.text}>
                    {COMPANY.street} {COMPANY.houseNumber}
                </p>
                <p className={styles.text}>
                    {COMPANY.countryCode} {COMPANY.city}
                </p>
            </div>
            <div className={styles.block}>
                <h2 className={styles.subHeading}>Kontakt</h2>
                <p className={styles.text}>Telefon: {COMPANY.telefone}</p>
                <p className={styles.text}>Email: {COMPANY.email}</p>
            </div>
        </div>
    );
}
