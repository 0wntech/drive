import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ContactListItem.module.scss';
import Add from '../../assets/svgIcons/Add';
import Delete from '../../assets/svgIcons/Delete';
import { getInitialsFromUser } from '../../utils/helper';
import DefaultIcon from '../DefaultIcon';

const ContactListItem = ({
    contact,
    webId,
    className,
    addContact,
    removeContact,
    onClick,
    isContact,
}) => {
    const [wasAdded, setWasAdded] = useState(isContact);
    const initials = getInitialsFromUser(contact);
    return (
        <div className={classNames(styles.container, className)}>
            <div
                className={styles.imageContainer}
                onClick={() => onClick(contact)}
                data-test-id="contact-picture"
            >
                {contact.picture ? (
                    <div
                        className={styles.image}
                        style={{ backgroundImage: `url('${contact.picture}')` }}
                    />
                ) : (
                    <DefaultIcon
                        initials={initials}
                        className={styles.defaultIcon}
                    />
                )}
            </div>
            <div
                className={styles.nameContainer}
                onClick={() => onClick(contact)}
            >
                {contact.name ? contact.name : 'No Name'}
            </div>
            <div
                className={classNames(styles.iconContainer, {
                    [styles.added]: !wasAdded,
                })}
            >
                {wasAdded ? (
                    <Delete
                        onClick={(e) => {
                            removeContact(webId, contact);
                            if (wasAdded) {
                                setWasAdded(false);
                            }
                            e.stopPropagation();
                        }}
                    />
                ) : (
                    <Add
                        onClick={(e) => {
                            addContact(webId, contact);
                            if (!wasAdded) {
                                setWasAdded(true);
                            }
                            e.stopPropagation();
                        }}
                    />
                )}
            </div>
        </div>
    );
};

ContactListItem.propTypes = {
    contact: PropTypes.object,
    className: PropTypes.string,
};

export default ContactListItem;
