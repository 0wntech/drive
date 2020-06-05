import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ContactListItem.module.css';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import Delete from '../../assets/svgIcons/Delete';

const ContactListItem = ({
    contact,
    webId,
    className,
    removeContact,
    onClick,
}) => {
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
            <div className={styles.iconContainer}>
                <Delete
                    onClick={(e) => {
                        removeContact(webId, contact.webId);
                        e.stopPropagation();
                    }}
                />
            </div>
        </div>
    );
};

ContactListItem.propTypes = {
    contact: PropTypes.object,
    className: PropTypes.string,
};

export default ContactListItem;
