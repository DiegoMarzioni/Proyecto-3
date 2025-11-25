import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <div className={styles.errorIllustration}>
          <div className={styles.errorNumber}>404</div>
          <div className={styles.errorIcon}>🎨</div>
        </div>
        
        <div className={styles.errorMessage}>
          <h1>¡Oops! Página no encontrada</h1>
          <p>La página que buscas no existe o ha sido movida.</p>
          <p>Parece que te has perdido en nuestro estudio de tatuajes.</p>
        </div>
        
        <div className={styles.errorActions}>
          <Link to="/" className={styles.btnPrimary}>
            🏠 Volver al inicio
          </Link>
          <Link to="/crear-turno" className={styles.btnSecondary}>
            📅 Agendar turno
          </Link>
        </div>
        
        <div className={styles.helpfulLinks}>
          <h3>¿Buscabas algo específico?</h3>
          <div className={styles.linksGrid}>
            <Link to="/perfil" className={styles.helpfulLink}>
              👤 Mi perfil
            </Link>
            <Link to="/mis-turnos" className={styles.helpfulLink}>
              📋 Mis turnos
            </Link>
            <Link to="/galeria-tatuajes" className={styles.helpfulLink}>
              🖼️ Galería
            </Link>
            <Link to="/equipo" className={styles.helpfulLink}>
              👥 Nuestro equipo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
