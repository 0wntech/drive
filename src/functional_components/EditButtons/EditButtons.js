import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
import useWindowDimension from '../../hooks/useWindowDimension';
import Check from '../../assets/svgIcons/Check';
import X from '../../assets/svgIcons/X';
import EditIcon from '../../assets/svgIcons/Edit';
import styles from './EditButtons.module.scss';
import styleConstants from '../../styles/constants.scss';

const EditButtons = ({ isEditable, onSubmit, onCancel, onEdit }) => {
    const { width } = useWindowDimension();
    if (isEditable) {
        if (width < styleConstants.screen_m) {
            return (
                <div className={styles.editButtons}>
                    <ActionButton
                        className={styles.actionButton}
                        onClick={onCancel}
                        label="Cancel"
                        size="lg"
                        color="red"
                        dataId="edit-cancel"
                    />
                    <ActionButton
                        className={styles.actionButton}
                        onClick={onSubmit}
                        label="Save"
                        size="lg"
                        color="green"
                        dataIid="edit-submit"
                    />
                </div>
            );
        } else if (width > styleConstants.screen_m) {
            return (
                <div className={styles.editButtons}>
                    <X
                        onClick={onCancel}
                        className={styles.icon}
                        data-test-id="edit-cancel"
                    />{' '}
                    <Check
                        className={styles.icon}
                        onClick={onSubmit}
                        data-test-id="edit-submit"
                    />
                </div>
            );
        }
    } else {
        if (width < styleConstants.screen_m) {
            return (
                <ActionButton onClick={onEdit} size="lg" color="blue">
                    <EditIcon
                        viewBox="3 2 30 30"
                        width="20"
                        height="20"
                        className={styles.iconWhite}
                        data-test-id="edit"
                    />
                    Edit Profile
                </ActionButton>
            );
        } else {
            return (
                <EditIcon
                    onClick={onEdit}
                    className={styles.icon}
                    data-test-id="edit"
                />
            );
        }
    }
};

EditButtons.propTypes = {
    isEditable: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onEdit: PropTypes.func,
};

export default EditButtons;
