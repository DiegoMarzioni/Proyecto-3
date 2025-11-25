import { getLoggedUser } from '../../helpers/authHelpers';
import styles from './UserAvatar.module.css';

const UserAvatar = ({ size = 'small' }) => {
    const user = getLoggedUser();
    const profilePicture = user?.user?.profilePicture;
    const userName = user?.user?.name || 'Usuario';

    return (
        <div className={`${styles.avatar} ${styles[size]}`}>
            {profilePicture ? (
                <img 
                    src={profilePicture} 
                    alt={`Avatar de ${userName}`}
                    className={styles.image}
                />
            ) : (
                <div className={styles.placeholder}>
                    {userName.charAt(0).toUpperCase()}
                </div>
            )}
        </div>
    );
};

export default UserAvatar;
