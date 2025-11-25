import styles from './Footer.module.css';
import untapLogo from '../../assets/untap.jpg';

const Footer = () => {
    return (
        <footer id="contacto" className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>Información</h3>
                    <p className={styles.description}>
                        cruzN Studio Tattoo es un estudio artístico de 
                        tatuajes y piercing en Buenos Aires, 
                        Argentina. Miembros de la Unión 
                        Nacional de Tatuadores y Anilladores 
                        Profesionales (UNTAP) desde hace 8 
                        años.
                    </p>
                </div>

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>LOCAL</h3>
                    <div className={styles.contactInfo}>
                        <div className={styles.addressContainer}>
                            <p className={styles.addressLabel}>DIRECCIÓN</p>
                            <p className={styles.address}>
                                Calle Gran Vía 28, 28013
                                <br />
                                Madrid, España
                            </p>
                            <a 
                                href="https://maps.google.com/?q=Calle+Gran+Vía+28,+28013+Madrid,+España" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.mapLink}
                            >
                                VER MAPA
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>APARTADOS WEB</h3>
                    <ul className={styles.linksList}>
                        <li><a href="https://www.promofarma.com/mag/como-cuidar-un-tatuaje-los-primeros-dias-t1nf9drer" target="_blank" rel="noopener noreferrer">Cuidados tattoo</a></li>
                        <li><a href="https://cuidateplus.marca.com/belleza-y-piel/cuidados-cuerpo/2016/05/13/ocho-consejos-cuidar-piercing-recien-hecho-112693.html" target="_blank" rel="noopener noreferrer">Cuidados piercings</a></li>
                        <li><a href="https://www.elmundodelabijouterie.com.ar/categoria-producto/piercing/" target="_blank" rel="noopener noreferrer">Artículos</a></li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>SÍGUENOS EN</h3>
                    <div className={styles.socialLinks}>
                        <a href="https://www.linkedin.com/in/diego-marzioni/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.instagram.com/diego_marzioni/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                    <div className={styles.untapLogo}>
                        <img src={untapLogo} alt="UNTAP Logo" className={styles.logoImage} />
                        <div className={styles.logoText}>
                            <span className={styles.logoTitle}>UNTAP</span>
                            <span className={styles.logoSubtitle}>
                                UNIÓN NACIONAL DE TATUADORES<br />
                                Y ANILLADORES PROFESIONALES
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.footerBottom}>
                <p>&copy; 2025 cruzN Studio Tattoo. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
