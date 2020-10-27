import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ClassicSpinner } from 'react-spinners-kit';

import styles from './AccessDisplay.module.scss';

import WarningIcon from '../../assets/svgIcons/Subtract';
import PublicIcon from '../../assets/svgIcons/PublicIcon';
import { toggleAccessWindow } from '../../actions/appActions';

export const AccessDisplay = ({
    currentAccessControl,
    loadCurrentAccessControl,
    toggleAccessWindow,
}) => (
    <div
        className={styles.container}
        onClick={currentAccessControl && toggleAccessWindow}
    >
        {loadCurrentAccessControl ? (
            <ClassicSpinner loading={true} size={24} color="#686769" />
        ) : currentAccessControl ? (
            <>
                {currentAccessControl.map((entity) =>
                    entity.type === 'Agent' ? (
                        <div
                            key={entity.identifier}
                            className={styles.agentIcon}
                            style={{
                                backgroundImage: `url(${entity.picture})`,
                            }}
                        />
                    ) : (
                        entity.type === 'AgentGroup' &&
                        entity.name === 'http://xmlns.com/foaf/0.1/Agent' && (
                            <PublicIcon
                                key={entity.identifier}
                                className={styles.agentIcon}
                            />
                        )
                    )
                )}
            </>
        ) : (
            <WarningIcon />
        )}
    </div>
);

const mapStateToProps = (state) => {
    return {
        currentAccessControl: state.app.currentAccessControl,
        loadCurrentAccessControl: state.app.loadCurrentAccessControl,
    };
};

export default withRouter(
    connect(mapStateToProps, { toggleAccessWindow })(AccessDisplay)
);
