import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppCard.module.scss';
import useHover from '../../hooks/useHover';

import X from '../../assets/svgIcons/X';
import { AppButtons } from '../AppButtons';

const mockFunction = () => {
    console.log('needs implementation');
};

const AppCard = ({ iconSrc, url, title, onClick, removeApp }) => {
    const [hoverRef, isHovered] = useHover();
    return (
        <div ref={hoverRef} onClick={onClick} className={styles.container}>
            {isHovered ? (
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
            <AppButtons
                onArrowClick={() => window.open(url, '_blank')}
                onFolderClick={mockFunction}
                onSettingsClick={mockFunction}
            />
        </div>
    );
};

AppCard.propTypes = {
    removeApp: PropTypes.func,
    iconSrc: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    permissions: PropTypes.object,
    onClick: PropTypes.func,
};

export default AppCard;
