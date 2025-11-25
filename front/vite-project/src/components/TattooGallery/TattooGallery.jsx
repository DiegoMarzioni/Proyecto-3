import { useState } from 'react';
import TattooCard from '../TattooCard/TattooCard';
import styles from './TattooGallery.module.css';

import dragonOriental from '../../assets/dragonOriental.webp';
import rosaRealista from '../../assets/rosaRealista.webp';
import mandalaGeometrico from '../../assets/mandalaGeometrico.jpg';
import leonTribal from '../../assets/leonTribal.jpg';
import mariposaAcuarela from '../../assets/mariposaAcuarela.jpg';
import calaveraMexicana from '../../assets/calaveraMexicana.jpg';
import loboMinimalista from '../../assets/loboMinimalista.jpg';
import florDeLoto from '../../assets/FlorDeLoto.jpg';

const tattooData = [
    {
        id: 1,
        title: "Dragón Oriental",
        category: "Oriental",
        image: dragonOriental,
        artist: "Studio Tattoo",
        duration: "6 horas"
    },
    {
        id: 2,
        title: "Rosa Realista",
        category: "Realismo",
        image: rosaRealista,
        artist: "Studio Tattoo",
        duration: "4 horas"
    },
    {
        id: 3,
        title: "Mandala Geométrico",
        category: "Geométrico",
        image: mandalaGeometrico,
        artist: "Studio Tattoo",
        duration: "5 horas"
    },
    {
        id: 4,
        title: "León Tribal",
        category: "Tribal",
        image: leonTribal,
        artist: "Studio Tattoo",
        duration: "3 horas"
    },
    {
        id: 5,
        title: "Mariposa Acuarela",
        category: "Acuarela",
        image: mariposaAcuarela,
        artist: "Studio Tattoo",
        duration: "4 horas"
    },
    {
        id: 6,
        title: "Calavera Mexicana",
        category: "Tradicional",
        image: calaveraMexicana,
        artist: "Studio Tattoo",
        duration: "5 horas"
    },
    {
        id: 7,
        title: "Lobo Minimalista",
        category: "Minimalista",
        image: loboMinimalista,
        artist: "Studio Tattoo",
        duration: "2 horas"
    },
    {
        id: 8,
        title: "Flor de Loto",
        category: "Oriental",
        image: florDeLoto,
        artist: "Studio Tattoo",
        duration: "3 horas"
    }
];

const categories = ["Todos", "Oriental", "Realismo", "Geométrico", "Tribal", "Acuarela", "Tradicional", "Minimalista"];

const TattooGallery = () => {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedTattoo, setSelectedTattoo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredTattoos = selectedCategory === "Todos" 
        ? tattooData 
        : tattooData.filter(tattoo => tattoo.category === selectedCategory);

    const handleTattooClick = (tattoo) => {
        setSelectedTattoo(tattoo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedTattoo(null);
        }, 300);
    };

    return (
        <div className={styles.galleryContainer}>
            
            <div className={styles.filtersContainer}>
                <h3 className={styles.filtersTitle}>Filtrar por Estilo</h3>
                <div className={styles.filterButtons}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`${styles.filterButton} ${
                                selectedCategory === category ? styles.active : ''
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            
            <div className={styles.tattooGrid}>
                {filteredTattoos.map(tattoo => (
                    <TattooCard
                        key={tattoo.id}
                        tattoo={tattoo}
                        onClick={() => handleTattooClick(tattoo)}
                    />
                ))}
            </div>

            
            {selectedTattoo && (
                <div className={`${styles.modal} ${isModalOpen ? styles.open : ''}`} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            ✕
                        </button>
                        <img 
                            src={selectedTattoo.image} 
                            alt={selectedTattoo.title}
                            className={styles.modalImage}
                        />
                        <div className={styles.modalInfo}>
                            <h2>{selectedTattoo.title}</h2>
                            <p><strong>Estilo:</strong> {selectedTattoo.category}</p>
                            <p><strong>Artista:</strong> {selectedTattoo.artist}</p>
                            <p><strong>Duración:</strong> {selectedTattoo.duration}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TattooGallery;
