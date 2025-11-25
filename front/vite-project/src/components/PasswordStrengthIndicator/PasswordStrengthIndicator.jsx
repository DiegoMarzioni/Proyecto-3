import { getPasswordStrength } from '../../helpers/formValidators';
import styles from './PasswordStrengthIndicator.module.css';

const PasswordStrengthIndicator = ({ password, show = true }) => {
    if (!show || !password) return null;
    
    const strength = getPasswordStrength(password);
    
    if (strength.level === 0) return null;
    
    return (
        <div className={styles.container}>
            <div className={styles.strengthBar}>
                {[1, 2, 3, 4, 5].map(level => (
                    <div
                        key={level}
                        className={`${styles.bar} ${level <= strength.level ? styles.active : ''}`}
                        style={level <= strength.level ? { backgroundColor: strength.color } : {}}
                    />
                ))}
            </div>
            <span 
                className={styles.strengthText}
                style={{ color: strength.color }}
            >
                {strength.text}
            </span>
        </div>
    );
};

export default PasswordStrengthIndicator;
