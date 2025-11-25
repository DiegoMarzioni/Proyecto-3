import styles from './TeamCard.module.css';

const TeamCard = ({ artist, onClick }) => {
    return (
        <div className={styles.card} onClick={() => onClick(artist)}>
            <div className={styles.imageContainer}>
                <img src={artist.image} alt={artist.name} className={styles.image} />
                <div className={styles.overlay}>
                    <div className={styles.viewMore}>VER MÁS</div>
                </div>
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{artist.name}</h3>
                <p className={styles.specialty}>{artist.specialty}</p>
                <p className={styles.experience}>{artist.experience} años de experiencia</p>
            </div>
        </div>
    );
};

export default TeamCard;
