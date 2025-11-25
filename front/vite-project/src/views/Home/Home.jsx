import HeroSection from "../../components/HeroSection/HeroSection";
import DescriptionSection from "../../components/DescriptionSection/DescriptionSection";
import StudioSection from "../../components/StudioSection/StudioSection";
import ServicesCards from "../../components/ServicesCards/ServicesCards";
import SmoothCarousel from "../../components/SmoothCarousel/SmoothCarousel";
import Footer from "../../components/Footer/Footer";
import { brandsData } from "../../data/brandsData";
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <HeroSection />
            <DescriptionSection />
            <StudioSection />
            <ServicesCards />
            <SmoothCarousel 
                brands={brandsData}
                title="BOUTIQUE STUDIO TATTOO"
                subtitle="VISITA NUESTRO ESTUDIO CON LA MEJOR ROPA Y COMPLEMENTOS"
            />
            <Footer />
        </div>
    );
};

export default Home;