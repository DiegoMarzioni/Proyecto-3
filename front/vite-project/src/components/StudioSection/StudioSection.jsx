import { useScrollAnimation, useParallax } from '../../hooks/useScrollAnimation';
import styles from './StudioSection.module.css';
import estudioTatuaje from '../../assets/estudioTatuaje.jpg';
import equipoTatuaje from '../../assets/equipoTatuaje.jpg';
import maquinaTatuaje from '../../assets/maquinaTatuaje.webp';

const StudioSection = () => {
    const [titleRef, titleVisible] = useScrollAnimation(0.3);
    const [textRef, textVisible] = useScrollAnimation(0.2);
    const [featuresRef, featuresVisible] = useScrollAnimation(0.1);
    const [imagesRef, imagesVisible] = useScrollAnimation(0.2);
    const [parallaxRef, parallaxOffset] = useParallax(-0.1);

    return (
        <section id="el-estudio" className={styles.studioSection}>
            <div 
                ref={parallaxRef}
                className={styles.parallaxBackground}
                style={{ transform: `translateY(${parallaxOffset}px)` }}
            />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <h2 
                            ref={titleRef}
                            className={`${styles.title} ${titleVisible ? styles.animate : ''}`}
                        >
                            NUESTRO ESTUDIO
                        </h2>
                        <div 
                            ref={textRef}
                            className={`${styles.description} ${textVisible ? styles.animate : ''}`}
                        >
                            <p>
                                Bienvenido a <strong>Tattoo Studio</strong>, un espacio único donde el arte del tatuaje 
                                cobra vida. Ubicado en el corazón de la ciudad, nuestro estudio combina la tradición 
                                artística con las técnicas más modernas para crear experiencias inolvidables.
                            </p>
                            <p>
                                Desde nuestra apertura, nos hemos dedicado a ofrecer un ambiente profesional, 
                                seguro y creativo donde cada cliente puede expresar su personalidad a través 
                                del arte corporal. Nuestras instalaciones cuentan con equipos de última generación 
                                y los más altos estándares de higiene y seguridad.
                            </p>
                            <p>
                                En Tattoo Studio, cada tatuaje es una obra de arte única. Nuestro equipo de 
                                artistas especializados trabaja de la mano contigo para crear diseños personalizados 
                                que reflejen tu esencia y estilo personal.
                            </p>
                        </div>
                        <div 
                            ref={featuresRef}
                            className={`${styles.features} ${featuresVisible ? styles.animate : ''}`}
                        >
                            <div className={styles.feature}>
                                <h3>HIGIENE Y SEGURIDAD</h3>
                                <p>Protocolos estrictos de esterilización y materiales desechables</p>
                            </div>
                            <div className={styles.feature}>
                                <h3>EQUIPOS PROFESIONALES</h3>
                                <p>Tecnología de vanguardia para resultados perfectos</p>
                            </div>
                            <div className={styles.feature}>
                                <h3>AMBIENTE CREATIVO</h3>
                                <p>Espacio diseñado para inspirar y relajar durante tu experiencia</p>
                            </div>
                        </div>
                    </div>
                    <div 
                        ref={imagesRef}
                        className={`${styles.imageContent} ${imagesVisible ? styles.animate : ''}`}
                    >
                        <div className={styles.imageGrid}>
                            <img 
                                src={estudioTatuaje} 
                                alt="Interior del estudio" 
                                className={styles.mainImage}
                            />
                            <img 
                                src={equipoTatuaje} 
                                alt="Equipos profesionales" 
                                className={styles.secondaryImage}
                            />
                            <img 
                                src={maquinaTatuaje} 
                                alt="Máquina de tatuaje" 
                                className={styles.secondaryImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudioSection;
