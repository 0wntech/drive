import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout } from '../Layout/Layout';
import styles from './SettingsPage.module.scss';
import { SettingsSection } from '../SettingsSection/SettingsSection';
import { idp } from '../../selectors/userSelectors';
import { fetchUser, logout, setStorageUrl } from '../../actions/userActions';
import { getRootFromWebId, isValidUrl } from '../../utils/url';
import useWindowDimensions from '../../hooks/useWindowDimension';
import size from '../../styles/constants.scss';

export const SettingsPage = ({
    idp,
    logout,
    user,
    webId,
    fetchUser,
    setStorageUrl,
}) => {
    // eslint-disable-next-line no-unused-vars
    const { _, width } = useWindowDimensions();
    const isMobile = width < size.screen_l;
    useEffect(() => {
        if (!user) {
            fetchUser(webId);
        } else if (!user.storage) {
            setStorageUrl(getRootFromWebId(webId), webId);
        }
    }, [fetchUser, setStorageUrl, user, webId]);
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
            type: 'danger',
        },
        {
            description: 'Log out of my account',
            label: 'Logout',
            onClick: () => logout(),
            type: 'secondary',
        },
    ];

    return (
        <Layout
            label="Settings"
            className={styles.layout}
            hideToolbar={isMobile}
        >
            <div className={styles.container}>
                <SettingsSection label="Account" options={accountSettings} />
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return { idp: idp(state), user: state.user.user, webId: state.user.webId };
};

export default connect(mapStateToProps, { logout, setStorageUrl, fetchUser })(
    SettingsPage
);
