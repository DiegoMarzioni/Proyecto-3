import TeamGrid from '../../components/TeamGrid/TeamGrid';
import Footer from '../../components/Footer/Footer';
import styles from './Equipo.module.css';

const Equipo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Nuestro Equipo</h1>
                <p className={styles.subtitle}>Conoce a nuestros artistas profesionales</p>
            </div>
            
            <TeamGrid />
            
            <Footer />
        </div>
    );
};

export default Equipo;
