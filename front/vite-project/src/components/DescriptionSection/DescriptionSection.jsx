import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './DescriptionSection.module.css';

const DescriptionSection = () => {
    const [titleRef, titleVisible] = useScrollAnimation(0.3);
    const [textRef, textVisible] = useScrollAnimation(0.2);

    return (
        <section className={styles.descriptionSection}>
            <div className={styles.container}>
                <h2 
                    ref={titleRef}
                    className={`${styles.subtitle} ${titleVisible ? styles.animate : ''}`}
                >
                    DONDE LA TINTA CORRE TODOS LOS DÍAS...
                </h2>
                <div 
                    ref={textRef}
                    className={`${styles.textContainer} ${textVisible ? styles.animate : ''}`}
                >
                    <p className={styles.description}>
                        Si te gustaría concretar una cita con nosotros, ve directamente a nuestra página 
                        de contacto y dinos por teléfono, email o WhatsApp que te gustaría hacerte.
                    </p>
                    <p className={styles.description}>
                        Si lo que buscas es inspiración, no dudes en visitar nuestras galerías 
                        en las secciones tattoo y piercing.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DescriptionSection;
