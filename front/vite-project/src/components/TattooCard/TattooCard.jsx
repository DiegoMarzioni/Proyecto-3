import styles from './TattooCard.module.css';

const TattooCard = ({ tattoo, onClick }) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageContainer}>
                <img 
                    src={tattoo.image} 
                    alt={tattoo.title}
                    className={styles.tattooImage}
                />
                <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                        <h3 className={styles.title}>{tattoo.title}</h3>
                        <p className={styles.category}>{tattoo.category}</p>
                        <div className={styles.viewButton}>
                            Ver Detalles
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.cardInfo}>
                <h4 className={styles.cardTitle}>{tattoo.title}</h4>
                <div className={styles.cardDetails}>
                    <span className={styles.categoryTag}>{tattoo.category}</span>
                    <span className={styles.duration}>{tattoo.duration}</span>
                </div>
            </div>
        </div>
    );
};

export default TattooCard;
