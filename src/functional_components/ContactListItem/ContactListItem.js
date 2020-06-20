import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ContactListItem.module.scss';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import Add from '../../assets/svgIcons/Add';
import Delete from '../../assets/svgIcons/Delete';

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
    return (
        <div
            onClick={() => onClick(contact)}
            className={classNames(styles.container, className)}
        >
            <div className={styles.imageContainer}>
                {contact.picture ? (
                    <div
                        className={styles.image}
                        style={{ backgroundImage: `url('${contact.picture}')` }}
                    />
                ) : (
                    <img
                        alt="profile"
                        className={styles.image}
                        src={defaultIcon}
                    />
                )}
            </div>
            <div className={styles.nameContainer}>
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
