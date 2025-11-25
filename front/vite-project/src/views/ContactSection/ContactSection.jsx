import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Footer from '../../components/Footer/Footer';
import styles from './ContactSection.module.css';

const ContactSection = () => {
    const [titleRef, titleVisible] = useScrollAnimation(0.3);
    const [formRef, formVisible] = useScrollAnimation(0.2);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado (sin funcionalidad)');
    };

    return (
        <div className={styles.contactPage}>
            <section className={styles.contactSection}>
                <div className={styles.container}>
                    <h1 
                        ref={titleRef}
                        className={`${styles.title} ${titleVisible ? styles.animate : ''}`}
                    >
                        CONTÁCTANOS
                    </h1>
                    
                    <div 
                        ref={formRef}
                        className={`${styles.formContainer} ${formVisible ? styles.animate : ''}`}
                    >
                        <form className={styles.contactForm} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="nombre" className={styles.label}>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    className={styles.input}
                                    placeholder="Tu nombre completo"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.input}
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="asunto" className={styles.label}>
                                    Asunto
                                </label>
                                <input
                                    type="text"
                                    id="asunto"
                                    name="asunto"
                                    className={styles.input}
                                    placeholder="¿En qué podemos ayudarte?"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="descripcion" className={styles.label}>
                                    Descripción
                                </label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    className={styles.textarea}
                                    placeholder="Cuéntanos más detalles sobre tu consulta..."
                                    rows="6"
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                ENVIAR
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default ContactSection;
