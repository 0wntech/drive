import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './ImageHandler.module.scss';
import DefaultIcon from '../DefaultIcon/DefaultIcon';
import { getInitialsFromUser } from '../../utils/helper';
import { getUsernameFromWebId } from '../../utils/url';

export const ImageHandler = ({
    user,
    className,
    defaultIconClassName,
    ...rest
}) => {
    const [profilePictureError, setProfilePictureError] = useState(false);
    const profilePictureRef = useRef();
    return user.picture && !profilePictureError ? (
        <div
            ref={profilePictureRef}
            className={classNames(className, styles.image)}
            {...rest}
        >
            <img
                alt={`${getUsernameFromWebId(user.webId)}'s profile`}
                onLoad={() => {
                    profilePictureRef.current.style.backgroundImage = `url(${user.picture})`;
                }}
                onError={() => setProfilePictureError(true)}
                src={user.picture}
            />
        </div>
    ) : (
        <DefaultIcon
            className={defaultIconClassName}
            initials={getInitialsFromUser(user)}
        />
    );
};

export default ImageHandler;
