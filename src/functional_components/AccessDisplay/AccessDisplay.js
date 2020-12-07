import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ClassicSpinner } from 'react-spinners-kit';
import classNames from 'classnames';

import styles from './AccessDisplay.module.scss';

import WarningIcon from '../../assets/svgIcons/Subtract';
import PublicIcon from '../../assets/svgIcons/PublicIcon';
import { toggleAccessWindow } from '../../actions/appActions';
import ImageHandler from '../ImageHandler';

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
                        <ImageHandler
                            user={entity}
                            className={styles.agentIcon}
                            defaultIconClassName={classNames(
                                styles.defaultIcon,
                                styles.agentIcon
                            )}
                            key={entity.identifier}
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
            <WarningIcon aria-label="You do not have the permission to control this resource" />
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
