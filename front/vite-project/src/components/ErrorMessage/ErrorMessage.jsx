import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className={styles.errorMessage}>
            <div className={styles.errorIcon}>⚠️</div>
            <span>{message}</span>
        </div>
    );
};

export default ErrorMessage;
