import React from 'react';
import ns from 'solid-namespace';
import { connect } from 'react-redux';

import PublicIcon from '../../assets/svgIcons/PublicIcon.js';
import styles from './AccessListItem.module.scss';
import AccessToggle from '../AccessToggle/AccessToggle.js';
import { toggleAccessMode } from '../../actions/appActions.js';
import { ClassicSpinner } from 'react-spinners-kit';
import { isValidUrl, getUsernameFromWebId } from '../../utils/url.js';
import { getInitialsFromUser } from '../../utils/helper.js';
import DefaultIcon from '../DefaultIcon/DefaultIcon.js';

export const AccessListItem = ({
    entity,
    user,
    currentPath,
    managingAccess,
    managingAccessFor,
    toggleAccessMode,
}) => {
    const isPublicEntity = entity.name === ns().foaf('Agent');
    const isCurrentUser = entity.webId === user.webId;

    return (
        <div className={styles.container}>
            {isPublicEntity ? (
                <PublicIcon
                    className={styles.image}
                    width={64}
                    height={64}
                    viewBox="0 0 40 40"
                />
            ) : entity.picture && isValidUrl(entity.picture) ? (
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${entity.picture})` }}
                ></div>
            ) : (
                <DefaultIcon
                    className={styles.defaultContactIcon}
                    initials={getInitialsFromUser(entity)}
                />
            )}
            <div className={styles.info}>
                {isPublicEntity ? (
                    <div className={styles.name}>Anyone</div>
                ) : isCurrentUser ? (
                    <div className={styles.name}>Me</div>
                ) : entity.name ? (
                    <div className={styles.name}>{entity.name}</div>
                ) : (
                    <div className={styles.name}>
                        {getUsernameFromWebId(entity.webId)}
                    </div>
                )}
                <div className={styles.access}>
                    <AccessToggle
                        mode={'Read'}
                        disabled={isCurrentUser}
                        active={entity.access.includes(ns().acl('Read'))}
                        onClick={() => {
                            toggleAccessMode(
                                currentPath,
                                entity,
                                ns().acl('Read')
                            );
                        }}
                    />
                    <AccessToggle
                        mode={'Write'}
                        disabled={isCurrentUser}
                        active={entity.access.includes(ns().acl('Write'))}
                        onClick={() => {
                            toggleAccessMode(
                                currentPath,
                                entity,
                                ns().acl('Write')
                            );
                        }}
                    />
                    <AccessToggle
                        mode={'Control'}
                        disabled={isCurrentUser}
                        active={entity.access.includes(ns().acl('Control'))}
                        onClick={() => {
                            toggleAccessMode(
                                currentPath,
                                entity,
                                ns().acl('Control')
                            );
                        }}
                    />
                    {managingAccess && managingAccessFor === entity.name && (
                        <div className={styles.spinner}>
                            <ClassicSpinner
                                loading={true}
                                size={24}
                                color="#686769"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    currentPath: state.app.currentPath,
    managingAccess: state.app.managingAccess,
    managingAccessFor: state.app.managingAccessFor,
});

export default connect(mapStateToProps, { toggleAccessMode })(AccessListItem);
