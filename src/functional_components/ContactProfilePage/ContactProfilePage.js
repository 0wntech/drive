import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './ContactProfilePage.module.scss';
import {
    addContact,
    removeContact,
    fetchContact,
    setCurrentContact,
} from '../../actions/contactActions';
import { KeyValuePair } from '../KeyValuePair';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import SingleValue from '../KeyValuePair/SingleValue';
import IconButton from '../IconButton/IconButton';
import Plus from '../../assets/svgIcons/Plus';
import { Layout } from '../Layout';
import { isContact } from '../../reducers/contactReducer';
import { handleError } from '../../utils/helper';
import {
    getUsernameFromWebId,
    getParamsFromUrl,
    getIdpFromWebId,
} from '../../utils/url';

const ContactProfilePage = ({
    currentContact,
    fetchContact,
    addContact,
    removeContact,
    setCurrentContact,
    webId,
    isContact,
    contacts,
    error,
}) => {
    handleError(error);
    useEffect(() => {
        const currentUser = getParamsFromUrl(window.location.href).u;
        if (!currentContact && contacts) {
            const contactFromContacts = contacts.find(
                (contact) => contact.webId == currentUser
            );
            if (contactFromContacts) setCurrentContact(contactFromContacts);
        } else if (
            !currentContact ||
            (currentContact && currentContact.webId !== currentUser)
        ) {
            fetchContact(currentUser);
        }
    }, []);
    return (
        <Layout
            toolbarClassName={styles.toolBar}
            className={styles.grid}
            label={currentContact && currentContact.name}
            isLoading={currentContact === null}
            label={`Profile of ${
                currentContact && currentContact.name
                    ? currentContact.name
                    : getUsernameFromWebId(
                          currentContact && currentContact.webId
                      )
            }`}
        >
            {currentContact ? (
                <div className={styles.profileContainer}>
                    <div className={styles.headContainer}>
                        <div
                            className={styles.profileImage}
                            style={
                                currentContact.picture
                                    ? {
                                          backgroundImage: `url('${currentContact.picture}')`,
                                      }
                                    : {
                                          backgroundImage: `url('${defaultIcon}')`,
                                      }
                            }
                        />
                        <div className={styles.nameContainer}>
                            <SingleValue
                                value={
                                    currentContact.name
                                        ? currentContact.name
                                        : getUsernameFromWebId(
                                              currentContact.webId
                                          )
                                }
                                className={styles.nameLabel}
                            />
                            <a
                                className={styles.webIdLabel}
                                href={
                                    currentContact &&
                                    `https://${getIdpFromWebId(
                                        currentContact.webId
                                    )}`
                                }
                                target="_blank"
                            >
                                {currentContact &&
                                    getIdpFromWebId(currentContact.webId)}
                            </a>
                            <SingleValue
                                value={currentContact.bio}
                                className={styles.bioLabel}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                        {isContact ? (
                            <IconButton
                                onClick={() =>
                                    removeContact(webId, currentContact)
                                }
                                className={styles.removeButton}
                            >
                                Remove
                            </IconButton>
                        ) : (
                            <IconButton
                                label="Add to Contacts"
                                className={styles.addButton}
                                onClick={() =>
                                    addContact(webId, currentContact)
                                }
                            >
                                <Plus className={styles.icon} />
                                Add to Contacts
                            </IconButton>
                        )}
                    </div>
                    <KeyValuePair
                        label="Job"
                        dataKey="job"
                        value={currentContact.job}
                    />
                    <KeyValuePair
                        label="Email"
                        dataKey="emails"
                        value={currentContact.emails}
                    />
                    <KeyValuePair
                        dataKey="telephones"
                        label="Telephone"
                        value={currentContact.telephones}
                    />
                </div>
            ) : null}
        </Layout>
    );
};

ContactProfilePage.propTypes = {
    currentContact: PropTypes.object,
};

const mapStateToProps = (state) => ({
    error: state.contact.error,
    currentContact: state.contact.currentContact,
    contacts: state.contact.contacts,
    webId: state.user.webId,
    isContact:
        state.contact && state.contact.currentContact
            ? isContact(state.contact, state.contact.currentContact.webId)
            : undefined,
});

export default connect(mapStateToProps, {
    addContact,
    removeContact,
    setCurrentContact,
    fetchContact,
})(ContactProfilePage);
