import React from 'react';
import { Window } from '../Window';
import styles from './AccessWindow.module.scss';
import { connect } from 'react-redux';

import { toggleAccessWindow } from '../../actions/appActions';
import AccessListItem from '../AccessListItem';

export const AccessWindow = ({
    toggleAccessWindow,
    isAccessWindowVisible,
    currentAccessControl,
}) => {
    return (
        <Window
            windowName={'Manage Access'}
            onClose={toggleAccessWindow}
            visible={isAccessWindowVisible}
            className={styles.window}
        >
            <div className={styles.body}>
                <div className={styles.search}></div>
                <div className={styles.entities}>
                    {currentAccessControl &&
                        currentAccessControl.map((entity) => (
                            <AccessListItem entity={entity} />
                        ))}
                </div>
            </div>
        </Window>
    );
};

const mapStateToProps = (state) => ({
    isAccessWindowVisible: state.app.isAccessWindowVisible,
    currentAccessControl: state.app.currentAccessControl,
});

export default connect(mapStateToProps, { toggleAccessWindow })(AccessWindow);
