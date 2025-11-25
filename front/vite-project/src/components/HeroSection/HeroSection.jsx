import { useEffect, useRef } from 'react';
import BackgroundImage from "../BackgroundImage.jsx/BackgroundImage";
import LogoIntro from "../LogoIntro/Logointro";
import styles from './HeroSection.module.css';

const HeroSection = () => {
    const heroRef = useRef(null);
    const backgroundRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current && backgroundRef.current && contentRef.current) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                const rateContent = scrolled * -0.3;
                
                backgroundRef.current.style.transform = `translateY(${rate}px)`;
                
                contentRef.current.style.transform = `translateY(${rateContent}px)`;
                
                const opacity = Math.max(0, Math.min(1, 1 - scrolled / (window.innerHeight * 0.6)));
                contentRef.current.style.opacity = opacity;
            }
        };

        if (contentRef.current) {
            contentRef.current.style.opacity = '1';
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={heroRef} className={styles.heroSection}>
            <div ref={backgroundRef} className={styles.parallaxBackground}>
                <BackgroundImage />
            </div>
            <div ref={contentRef} className={styles.parallaxContent}>
                <LogoIntro />
            </div>
        </section>
    );
};

export default HeroSection;
