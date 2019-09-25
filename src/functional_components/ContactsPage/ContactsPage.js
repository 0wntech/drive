import React from 'react';
import styles from './ContactsPage.module.css';
const ContactsPage = (props) => {
    return (
        <div className={styles.grid}>
            <div className={styles.toolbarArea}>
                <div className={styles.toolbarTitle}>Contacts</div>
            </div>
            <div className={styles.profileContainer}></div>
        </div>
    );
};

ContactsPage.propTypes = {};

export default ContactsPage;
