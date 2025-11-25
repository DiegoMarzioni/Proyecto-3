import styles from './SmoothCarousel.module.css';

const SmoothCarousel = ({ brands, title, subtitle }) => {
    const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

    return (
        <section className={styles.carouselSection}>
            {title && (
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            )}
            
            <div className={styles.carouselContainer}>
                <div className={styles.carouselTrack}>
                    {duplicatedBrands.map((brand, index) => (
                        <div key={`${brand.id}-${index}`} className={styles.brandItem}>
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className={`${styles.brandLogo} ${brand.needsWhiteFilter ? styles.whiteFilter : styles.colorLogo} ${brand.name === 'Studio Tattoo' ? styles.studioLogo : ''}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SmoothCarousel;
