import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './ContactProfilePage.module.css';
import { addContact, removeContact } from '../../actions/contactActions';
import { KeyValuePair } from '../KeyValuePair';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import SingleValue from '../KeyValuePair/SingleValue';
import Settings from '../../assets/svgIcons/Settings';
import IconButton from '../IconButton/IconButton';
import Plus from '../../assets/svgIcons/Plus';
import { Layout } from '../Layout';
import { isContact } from '../../reducers/contactReducer';
import { handleError } from '../../utils/helper';

const toolbarRight = <Settings className={styles.settings} />;

const ContactProfilePage = ({
    currentContact,
    addContact,
    removeContact,
    webId,
    isContact,
    error,
}) => {
    handleError(error);
    return (
        <Layout
            className={styles.grid}
            label={currentContact.name}
            toolbarChildrenRight={toolbarRight}
            isLoading={currentContact === null}
        >
            <div className={styles.profileContainer}>
                <div className={styles.headContainer}>
                    <div
                        className={styles.profileImage}
                        style={
                            currentContact && currentContact.picture
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
                            value={currentContact.name}
                            className={styles.nameLabel}
                            placeholder="no name"
                        />
                        <div className={styles.webIdLabel}>
                            {currentContact.webId.replace(
                                '/profile/card#me',
                                ''
                            )}
                        </div>
                    </div>
                    <div className={styles.bio}>
                        <SingleValue
                            value={currentContact.bio}
                            className={styles.bioLabel}
                            placeholder="no bio"
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        {isContact ? (
                            <IconButton
                                onClick={() =>
                                    removeContact(webId, currentContact.webId)
                                }
                                className={styles.removeButton}
                            >
                                Remove
                            </IconButton>
                        ) : (
                            <IconButton
                                label="Add"
                                className={styles.addButton}
                                onClick={() =>
                                    addContact(webId, currentContact.webId)
                                }
                            >
                                <Plus className={styles.icon} />
                                Add
                            </IconButton>
                        )}
                    </div>
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
        </Layout>
    );
};

ContactProfilePage.propTypes = {
    currentContact: PropTypes.object,
};

const mapStateToProps = (state) => ({
    error: state.contact.error,
    currentContact: state.contact.currentContact,
    webId: state.user.webId,
    isContact: isContact(state.contact, state.contact.currentContact.webId),
});

export default connect(mapStateToProps, { addContact, removeContact })(
    ContactProfilePage
);
