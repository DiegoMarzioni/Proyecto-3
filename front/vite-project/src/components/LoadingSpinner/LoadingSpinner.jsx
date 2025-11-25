import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ message = "Cargando..." }) => {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>{message}</p>
        </div>
    );
};

export default LoadingSpinner;
