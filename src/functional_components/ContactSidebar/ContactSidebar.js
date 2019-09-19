import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from '../../actions/UserActions';
import auth from 'solid-auth-client';

const ContactScreen = (props) => {
    const { contacts } = props;
    useEffect(() => {
        auth.trackSession((session) => {
            if (session) {
                // fetchContacts(user);
            }
        });
    });

    return <div>{contacts ? <div>No contacts</div> : null}</div>;
};

const mapStateToProps = (state) => {
    return {
        contacts: state.app.contacts,
        webId: state.app.webId,
    };
};

export default connect(
    mapStateToProps,
    { fetchContacts }
)(ContactScreen);
