import { useEffect, useState } from 'react';
import styles from './BrandsCarousel.module.css';

const BrandsCarousel = ({ brands, title, subtitle }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const duplicatedBrands = [...brands, ...brands];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (prevIndex >= brands.length) {
                    return 0;
                }
                return prevIndex + 1;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [brands.length]);

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
                    <div 
                        className={styles.carouselContent}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / brands.length)}%)`,
                            width: `${duplicatedBrands.length * (100 / brands.length)}%`
                        }}
                    >
                        {duplicatedBrands.map((brand, index) => (
                            <div key={`${brand.id}-${index}`} className={styles.brandItem}>
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className={styles.brandLogo}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandsCarousel;
