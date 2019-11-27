import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './RecommendationItem.module.css';
import defaultIcon from '../../assets/icons/defaultUserPic2.png';
import Add from '../../assets/svgIcons/Add';
import Check from '../../assets/svgIcons/Check';

const ContactListItem = ({
    contact,
    webId,
    className,
    addContact,
    onClick,
}) => {
    const [wasAdded, setWasAdded] = useState(false);
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
                {wasAdded ? (
                    <Check />
                ) : (
                    <Add
                        onClick={(e) => {
                            addContact(webId, contact.webId);
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
