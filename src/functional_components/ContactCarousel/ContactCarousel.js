import React from 'react';

import styles from './ContactCarousel.module.scss';
import DefaultIcon from '../DefaultIcon/DefaultIcon';
import { getInitialsFromUser } from '../../utils/helper';
import { getUsernameFromWebId } from '../../utils/url';

export const ContactCarousel = ({ contacts, onClick }) => {
    return (
        contacts &&
        contacts.length !== 0 && (
            <div className={styles.container}>
                <div className={styles.label}>Contacts:</div>
                <div className={styles.contactList}>
                    {contacts.map((contact) => (
                        <div
                            className={styles.contact}
                            onClick={() => onClick(contact)}
                        >
                            {contact.picture ? (
                                <div
                                    className={styles.image}
                                    style={{
                                        backgroundImage: `url(${contact.picture})`,
                                    }}
                                />
                            ) : (
                                <DefaultIcon
                                    className={styles.defaultImage}
                                    initials={getInitialsFromUser(contact)}
                                />
                            )}
                            <div className={styles.name}>
                                {contact.name
                                    ? contact.name.split(' ')[0]
                                    : getUsernameFromWebId(contact.webId)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default ContactCarousel;
