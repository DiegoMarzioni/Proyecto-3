import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './ServicesCards.module.css';
import backgroundPrueba from '../../assets/backgroundPrueba.png';
import bg from '../../assets/bg.jpg';

const ServicesCards = () => {
    const [titleRef, titleVisible] = useScrollAnimation(0.3);
    const [cardsRef, cardsVisible] = useScrollAnimation(0.2);

    const cardsData = [
        {
            id: 1,
            image: backgroundPrueba,
            title: "NUESTROS TATUADORES",
            description: "Conoce a nuestro equipo de artistas profesionales con amplia experiencia en todo tipo de estilos.",
            buttonText: "VER EQUIPO",
            link: "/equipo"
        },
        {
            id: 2,
            image: bg,
            title: "NUESTROS TRABAJOS",
            description: "Explora nuestra galería de trabajos realizados, desde lo más vintage a lo más contemporáneo.",
            buttonText: "VER GALERÍA",
            link: "/galeria-tatuajes"
        }
    ];

    return (
        <section className={styles.cardsSection}>
            <div className={styles.container}>
                <h2 
                    ref={titleRef}
                    className={`${styles.sectionTitle} ${titleVisible ? styles.animate : ''}`}
                >
                    ESTUDIO ARTÍSTICO DE TATUAJES & PIERCING
                </h2>
                
                <div 
                    ref={cardsRef}
                    className={`${styles.cardsGrid} ${cardsVisible ? styles.animate : ''}`}
                >
                    {cardsData.map((card, index) => (
                        <div 
                            key={card.id} 
                            className={styles.card}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={styles.cardImage}>
                                <img src={card.image} alt={card.title} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                {card.link ? (
                                    <Link to={card.link} className={styles.cardButton}>
                                        {card.buttonText}
                                    </Link>
                                ) : (
                                    <button className={styles.cardButton}>
                                        {card.buttonText}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesCards;
