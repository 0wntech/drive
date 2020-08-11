import React from 'react';
import { connect } from 'react-redux';
import { Layout } from '../Layout/Layout';
import styles from './SettingsPage.module.scss';
import { SettingsSection } from '../SettingsSection/SettingsSection';
import { idp } from '../../selectors/userSelectors';
import { logout } from '../../actions/userActions';

export const SettingsPage = ({ idp, logout }) => {
    const accountSettings = [
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
    return { idp: idp(state) };
};

export default connect(mapStateToProps, { logout })(SettingsPage);
