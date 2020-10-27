import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';

import styles from './SelectModeButton.module.scss';
import { setSelection } from '../../actions/appActions';

export const SelectModeButton = ({ selectionMode, setSelection }) => {
    return (
        <div
            className={classNames(styles.container, {
                [styles.hidden]: !selectionMode,
            })}
            onClick={() => {
                setSelection([]);
            }}
        >
            End Selection
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectionMode: state.app.selectionMode,
    };
};

export default withRouter(
    connect(mapStateToProps, { setSelection })(SelectModeButton)
);
