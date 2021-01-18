import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ContactListItem.module.scss';
import Add from '../../assets/svgIcons/Add';
import Delete from '../../assets/svgIcons/Delete';
import { getIdpFromWebId, getUsernameFromWebId } from '../../utils/url';
import ImageHandler from '../ImageHandler';

const ContactListItem = ({
    contact,
    webId,
    withIdp,
    className,
    addContact,
    removeContact,
    removable,
    onClick,
    isContact,
}) => {
    const [wasAdded, setWasAdded] = useState(isContact);
    return (
        <div
            className={classNames(styles.container, className)}
            onClick={() => onClick(contact)}
            data-test-id={`contact-${new URL(contact.webId).host}`}
        >
            <div
                className={styles.imageContainer}
                onClick={() => onClick(contact)}
                data-test-id="contact-picture"
            >
                <ImageHandler
                    user={contact}
                    className={styles.image}
                    defaultIconClassName={styles.defaultIcon}
                />
            </div>
            <div className={styles.nameContainer}>
                {contact.name
                    ? contact.name
                    : getUsernameFromWebId(contact.webId)}
            </div>
            {withIdp && (
                <div className={styles.idpContainer}>
                    {getIdpFromWebId(contact.webId)}
                </div>
            )}
            <div
                className={classNames(styles.iconContainer, {
                    [styles.added]: !wasAdded,
                })}
            >
                {removable &&
                    (wasAdded ? (
                        <Delete
                            data-test-id={`delete-contact-${getUsernameFromWebId(
                                contact.webId
                            )}`}
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
                            data-test-id={`add-contact-${getUsernameFromWebId(
                                contact.webId
                            )}`}
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
