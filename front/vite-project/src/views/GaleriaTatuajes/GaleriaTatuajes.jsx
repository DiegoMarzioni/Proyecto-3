import TattooGallery from '../../components/TattooGallery/TattooGallery';
import Footer from '../../components/Footer/Footer';
import styles from './GaleriaTatuajes.module.css';

const GaleriaTatuajes = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Galería de Tatuajes</h1>
                <p className={styles.subtitle}>Nuestros mejores trabajos</p>
            </div>
            
            <TattooGallery />
            
            <Footer />
        </div>
    );
};

export default GaleriaTatuajes;
