import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styles from './ContactListItem.module.css';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import Delete from '../../assets/svgIcons/Delete';
import { removeContact } from '../../actions/UserActions';

const ContactListItem = ({ contact, webId, className, removeContact }) => {
    console.log('contact', contact);
    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.imageContainer}>
                {contact.picture ? (
                    <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${contact.picture})` }}
                    />
                ) : (
                    <img className={styles.image} src={defaultIcon} />
                )}
            </div>
            <div className={styles.nameContainer}>
                {contact.name ? contact.name : 'No Name'}
            </div>
            <div className={styles.iconContainer}>
                <Delete onClick={() => removeContact(webId, contact.webId)} />
            </div>
        </div>
    );
};

ContactListItem.propTypes = {
    contact: PropTypes.object,
    className: PropTypes.string,
};

const mapStateToProps = (state) => ({
    webId: state.app.webId,
});

export default connect(
    mapStateToProps,
    { removeContact }
)(ContactListItem);
