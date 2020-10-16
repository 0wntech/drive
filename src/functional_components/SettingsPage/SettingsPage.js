import React from 'react';
import { connect } from 'react-redux';
import { Layout } from '../Layout/Layout';
import styles from './SettingsPage.module.scss';
import { SettingsSection } from '../SettingsSection/SettingsSection';
import { idp } from '../../selectors/userSelectors';
import { logout, setStorageUrl } from '../../actions/userActions';
import { isValidUrl } from '../../utils/url';

export const SettingsPage = ({ idp, logout, user, setStorageUrl }) => {
    const accountSettings = [
        {
            description: 'Root storage url',
            initialValue: user.storage,
            onSubmit: (value) => {
                if (isValidUrl(value))
                    setStorageUrl(
                        value.endsWith('/') ? value : value + '/',
                        user.webId
                    );
            },
        },
        {
            description: 'Delete my account',
            label: 'Delete',
            onClick: () => window.open(idp + 'account/delete', '_blank'),
            color: 'red',
            type: 'secondary',
        },
        {
            description: 'Log out of my account',
            label: 'Logout',
            onClick: () => logout(),
            color: 'red',
        },
    ];

    return (
        <Layout label="Settings" className={styles.layout} hideToolbar>
            <div className={styles.container}>
                <SettingsSection label="Account" options={accountSettings} />
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return { idp: idp(state), user: state.user.user };
};

export default connect(mapStateToProps, { logout, setStorageUrl })(
    SettingsPage
);
