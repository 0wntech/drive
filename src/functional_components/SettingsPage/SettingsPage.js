import React from 'react';
import { connect } from 'react-redux';
import { Layout } from '../Layout/Layout';
import styles from './SettingsPage.module.css';
import { SettingsSection } from '../SettingsSection/SettingsSection';
import { idp } from '../../selectors/userSelectors';

export const SettingsPage = ({ idp }) => {
    const buttons = [
        {
            description: 'Delete my account',
            label: 'Delete',
            onClick: () => window.open(idp + 'account/delete', '_blank'),
            color: 'red',
        },
    ];

    return (
        <Layout label="Settings" className={styles.layout}>
            <div className={styles.container}>
                <SettingsSection label="Account" buttons={buttons} />
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return { idp: idp(state) };
};

export default connect(mapStateToProps, {})(SettingsPage);
