import { useState } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import styles from './TeamGrid.module.css';

const TeamGrid = () => {
    const [selectedArtist, setSelectedArtist] = useState(null);

    const artists = [
        {
            id: 1,
            name: "Carlos Mendoza",
            specialty: "Realismo",
            experience: 8,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
            description: "Especialista en tatuajes realistas con un enfoque particular en retratos y elementos naturales. Su técnica precisa y atención al detalle han convertido su trabajo en referencias del estilo.",
            instagram: "@carlos_ink_reality",
            portfolio: ["Retratos", "Animales", "Naturaleza", "Blanco y Negro", "Sombreados"]
        },
        {
            id: 2,
            name: "Luna Rodríguez",
            specialty: "Acuarela",
            experience: 6,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
            description: "Artista innovadora especializada en técnicas de acuarela que crea diseños únicos con efectos de fluidez y color. Su estilo distintivo combina elementos tradicionales con toques modernos.",
            instagram: "@luna_watercolor_tattoo",
            portfolio: ["Flores", "Abstracto", "Colores Vibrantes", "Efectos Líquidos", "Diseños Únicos"]
        },
        {
            id: 3,
            name: "Miguel Santos",
            specialty: "Tradicional",
            experience: 12,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
            description: "Maestro del estilo tradicional americano con más de una década de experiencia. Su trabajo respeta las técnicas clásicas mientras aporta su toque personal a cada diseño.",
            instagram: "@miguel_traditional_ink",
            portfolio: ["Old School", "Pin-ups", "Águilas", "Rosas", "Lettering Clásico"]
        },
        {
            id: 4,
            name: "Sofia Chen",
            specialty: "Oriental",
            experience: 9,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
            description: "Experta en tatuajes de estilo oriental, especializada en dragones, peces koi y elementos de la cultura asiática. Su comprensión profunda de la simbología oriental se refleja en cada pieza.",
            instagram: "@sofia_oriental_art",
            portfolio: ["Dragones", "Peces Koi", "Flores de Cerezo", "Mangas Orientales", "Simbología Asiática"]
        },
        {
            id: 5,
            name: "Alejandro Vega",
            specialty: "Tribal",
            experience: 10,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
            description: "Especialista en diseños tribales y geométricos con una perspectiva contemporánea. Combina patrones ancestrales con técnicas modernas para crear piezas impactantes y significativas.",
            instagram: "@alex_tribal_geometry",
            portfolio: ["Tribal", "Geométrico", "Maorí", "Patrones Ancestrales", "Blackwork"]
        }
    ];

    const handleCardClick = (artist) => {
        setSelectedArtist(artist);
    };

    const closeModal = () => {
        setSelectedArtist(null);
    };

    return (
        <div className={styles.teamContainer}>
            <div className={styles.teamGrid}>
                {artists.map(artist => (
                    <TeamCard 
                        key={artist.id} 
                        artist={artist} 
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            {selectedArtist && (
                <div className={styles.modal} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            ×
                        </button>
                        <div className={styles.modalBody}>
                            <div className={styles.modalImage}>
                                <img src={selectedArtist.image} alt={selectedArtist.name} />
                            </div>
                            <div className={styles.modalInfo}>
                                <h2>{selectedArtist.name}</h2>
                                <h3>Especialista en {selectedArtist.specialty}</h3>
                                <p className={styles.experience}>
                                    <strong>Experiencia:</strong> {selectedArtist.experience} años
                                </p>
                                <p className={styles.description}>
                                    {selectedArtist.description}
                                </p>
                                <div className={styles.portfolio}>
                                    <strong>Portfolio:</strong>
                                    <div className={styles.tags}>
                                        {selectedArtist.portfolio.map((tag, index) => (
                                            <span key={index} className={styles.tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className={styles.social}>
                                    <strong>Instagram:</strong>
                                    <span className={styles.instagram}>{selectedArtist.instagram}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamGrid;
