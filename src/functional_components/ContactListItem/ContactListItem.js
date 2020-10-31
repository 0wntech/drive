import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ContactListItem.module.scss';
import Add from '../../assets/svgIcons/Add';
import Delete from '../../assets/svgIcons/Delete';
import { getInitialsFromUser } from '../../utils/helper';
import DefaultIcon from '../DefaultIcon';
import { getUsernameFromWebId } from '../../utils/url';

const ContactListItem = ({
    contact,
    webId,
    className,
    addContact,
    removeContact,
    removable,
    onClick,
    isContact,
}) => {
    const [wasAdded, setWasAdded] = useState(isContact);
    const initials = getInitialsFromUser(contact);
    return (
        <div
            className={classNames(styles.container, className)}
            onClick={() => onClick(contact)}
        >
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
            <div className={styles.nameContainer}>
                {contact.name
                    ? contact.name
                    : getUsernameFromWebId(contact.webId)}
            </div>
            <div
                className={classNames(styles.iconContainer, {
                    [styles.added]: !wasAdded,
                })}
            >
                {removable &&
                    (wasAdded ? (
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
                    ))}
            </div>
        </div>
    );
};

ContactListItem.propTypes = {
    contact: PropTypes.object,
    className: PropTypes.string,
};

export default ContactListItem;
