import React from 'react';
import styles from './ProfilePage.module.css';

import Settings from '../../assets/svgIcons/Settings';
import EditIcon from '../../assets/svgIcons/Edit';
import defaultIcon from '../../assets/icons/defaultUserPic.png';

export default function ProfilePage({
    isExpanded,
    toggleSidebar,
    user,
    onProfileUpdate,
    onPictureChange,
}) {
    return (
        <div className={styles.grid}>
            <div className={styles.toolbarArea}>
                <div className={styles.iconWrapper}>
                    <Settings className={styles.settings} />
                </div>
            </div>
            <div className={styles.profileContainer}>
                <div className={styles.headContainer}>
                    <div
                        className={styles.profileImage}
                        style={
                            user && user.picture
                                ? { backgroundImage: `url(${user.picture})` }
                                : { backgroundImage: `url(${defaultIcon})` }
                        }
                    />
                    <div className={styles.nameContainer}>
                        <div className={styles.nameLabel}>Test</div>
                        <div className={styles.webIdLabel}>
                            https://ludwig.owntech.de
                        </div>
                    </div>
                    <div className={styles.editIconContainer}>
                        <EditIcon className={styles.editIcon} />
                    </div>
                    <div className={styles.bio}>Hacking is life. (Bio)</div>
                </div>
            </div>
        </div>
        // <div className={isExpanded ? styles.background : undefined}>
        //     <div
        //         className={classNames(styles.container, {
        //             [styles.active]: isExpanded,
        //         })}
        //     >
        //         <img
        //             className={styles.closeButton}
        //             onClick={toggleSidebar}
        //             src={closeIcon}
        //         />
        //         <div className={classNames(styles.head, styles.section)}>
        //             {user.picture ? (
        //                 <div
        //                     ref={hoverRef}
        //                     className={styles.profilePicture}
        //                     style={{ backgroundImage: `url(${user.picture})` }}
        //                 >
        //                     <input
        //                         type="file"
        //                         onChange={onPictureChange}
        //                         style={{ display: 'none' }}
        //                         id="pictureUpload"
        //                         accept="*/*"
        //                     />
        //                     {isHovered ? (
        //                         <label
        //                             htmlFor="pictureUpload"
        //                             style={{ height: 100, width: 100 }}
        //                         >
        //                             <img
        //                                 src={editIcon}
        //                                 className={styles.editIcon}
        //                             />
        //                         </label>
        //                     ) : (
        //                         <p className={classNames(styles.pictureChange)}>
        //                             Click to Change
        //                         </p>
        //                     )}
        //                 </div>
        //             ) : (
        //                 <label
        //                     htmlFor="pictureUpload"
        //                     ref={hoverRef}
        //                     className={styles.label}
        //                 >
        //                     <img
        //                         className={styles.profilePicture}
        //                         src={defaultIcon}
        //                     />
        //                     <input
        //                         type="file"
        //                         onChange={onPictureChange}
        //                         style={{ display: 'none' }}
        //                         id="pictureUpload"
        //                         accept="*/*"
        //                     />
        //                     {isHovered ? (
        //                         <label
        //                             htmlFor="pictureUpload"
        //                             style={{ height: 100, width: 100 }}
        //                         >
        //                             <input
        //                                 type="file"
        //                                 onChange={onPictureChange}
        //                                 style={{ display: 'none' }}
        //                                 id="pictureUpload"
        //                                 accept="*/*"
        //                             />
        //                             <img
        //                                 src={editIcon}
        //                                 className={styles.editIcon}
        //                             />
        //                         </label>
        //                     ) : (
        //                         <p className={classNames(styles.pictureChange)}>
        //                             Click to Change
        //                         </p>
        //                     )}
        //                 </label>
        //             )}
        //             <div>
        //                 <p className={styles.name}>{user.name}</p>
        //                 <p className={styles.job}>{user.job}</p>
        //             </div>
        //         </div>
        //         {Object.keys(user).map((key, index) => (
        //             <KeyValuePair
        //                 key={key + index}
        //                 keyVal={key}
        //                 currentValues={value}
        //                 values={user[key]}
        //                 onUpdate={onProfileUpdate}
        //                 onEdit={updateValue}
        //                 webId={user['webId']}
        //             />
        //         ))}
        //         <div className={styles.addButton}>add new category</div>
        //     </div>
        // </div>
    );
}
