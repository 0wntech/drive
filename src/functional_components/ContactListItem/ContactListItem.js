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
    size,
}) => {
    return (
        <div
            onClick={() => onClick(contact)}
            className={classNames(styles.container, className, styles[size])}
        >
            <div className={classNames(styles.imageContainer, styles[size])}>
                {contact.picture ? (
                    <div
                        className={classNames(styles.image, styles[size])}
                        style={{ backgroundImage: `url('${contact.picture}')` }}
                    />
                ) : (
                    <img
                        alt="profile"
                        className={classNames(styles.image, styles[size])}
                        src={defaultIcon}
                    />
                )}
            </div>
            <div className={classNames(styles.nameContainer, styles[size])}>
                {contact.name ? contact.name : 'No Name'}
            </div>

            {removeContact ? (
                <div className={classNames(styles.iconContainer, styles[size])}>
                    <Delete
                        onClick={(e) => {
                            removeContact(webId, contact.webId);
                            e.stopPropagation();
                        }}
                    />
                </div>
            ) : null}
        </div>
    );
};

ContactListItem.propTypes = {
    contact: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm']),
};

export default ContactListItem;
