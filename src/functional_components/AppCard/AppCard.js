import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppCard.module.css';
import useHover from '../../hooks/useHover';

import X from '../../assets/svgIcons/X';
import { AppButtons } from '../AppButtons';
import classNames from 'classnames';

const mockFunction = () => {
    console.log('needs implementation');
};

const AppCard = ({
    iconSrc,
    url,
    title,
    onClick,
    removeApp,
    className,
    hideButtons,
}) => {
    const [hoverRef, isHovered] = useHover();
    return (
        <div
            ref={hoverRef}
            onClick={onClick}
            className={classNames(className, styles.container)}
        >
            {isHovered && removeApp ? (
                <div
                    onClick={() => removeApp(url)}
                    className={styles.deleteButton}
                >
                    <X viewBox="0 0 32 32" className={styles.xIcon} />
                </div>
            ) : null}
            <div
                className={styles.appIcon}
                style={{ backgroundImage: `url('${iconSrc}')` }}
            />
            <div className={styles.name}>{title}</div>
            {hideButtons ? null : (
                <AppButtons
                    onArrowClick={() => window.open(url, '_blank')}
                    onFolderClick={mockFunction}
                    onSettingsClick={mockFunction}
                />
            )}
        </div>
    );
};

AppCard.propTypes = {
    className: PropTypes.string,
    removeApp: PropTypes.func,
    iconSrc: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    permissions: PropTypes.object,
    onClick: PropTypes.func,
    hideButtons: PropTypes.bool,
};

export default AppCard;
