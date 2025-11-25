import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { validateOnChange, validateField } from '../../helpers/formValidators';
import PasswordStrengthIndicator from '../../components/PasswordStrengthIndicator/PasswordStrengthIndicator';
import styles from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthdate: '',
        nDni: '',
        credential: {
            username: '',
            password: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'username' || name === 'password') {
            setFormData(prev => ({
                ...prev,
                credential: {
                    ...prev.credential,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        
        const error = validateOnChange(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const validateForm = () => {
        const newErrors = {};

        
        const nameError = validateField('name', formData.name, { required: true });
        if (nameError) {
            newErrors.name = nameError;
        }

        
        const emailError = validateField('email', formData.email, { required: true });
        if (emailError) {
            newErrors.email = emailError;
        }

        
        const birthdateError = validateField('birthdate', formData.birthdate, { required: true });
        if (birthdateError) {
            newErrors.birthdate = birthdateError;
        }

        
        const dniError = validateField('nDni', formData.nDni, { required: true });
        if (dniError) {
            newErrors.nDni = dniError;
        }

        
        const usernameError = validateField('username', formData.credential.username, { required: true });
        if (usernameError) {
            newErrors.username = usernameError;
        }

        
        const passwordError = validateField('password', formData.credential.password, { required: true, strong: true });
        if (passwordError) {
            newErrors.password = passwordError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await axios.post('http://localhost:3000/users/register', formData);
            
            
            await Swal.fire({
                title: '¡Registro exitoso!',
                text: 'Usuario registrado correctamente. ¡Bienvenido!',
                icon: 'success',
                confirmButtonText: 'Ir al Login',
                confirmButtonColor: '#ff6b6b',
                timer: 3000,
                timerProgressBar: true
            });
            
            
            setFormData({
                name: '',
                email: '',
                birthdate: '',
                nDni: '',
                credential: {
                    username: '',
                    password: ''
                }
            });

            
            navigate('/login');

        } catch (error) {
            console.error('Error en el registro:', error);
            
            let errorMessage = 'Error al registrar usuario. Intenta nuevamente.';
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.errors) {
                errorMessage = 'Datos inválidos. Verifica la información ingresada.';
            }
            
            
            await Swal.fire({
                title: 'Error en el registro',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                confirmButtonColor: '#ff6b6b'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.registerCard}>
                <div className={styles.header}>
                    <h1>Registro</h1>
                    <p>Crea tu cuenta en Studio Tattoo</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.section}>
                        <h3>Información Personal</h3>
                        
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? styles.error : ''}
                                placeholder="Ingresa tu nombre completo"
                            />
                            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? styles.error : ''}
                                placeholder="ejemplo@correo.com"
                            />
                            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                        </div>

                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="birthdate">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                    className={errors.birthdate ? styles.error : ''}
                                />
                                {errors.birthdate && <span className={styles.errorMessage}>{errors.birthdate}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="nDni">DNI</label>
                                <input
                                    type="text"
                                    id="nDni"
                                    name="nDni"
                                    value={formData.nDni}
                                    onChange={handleChange}
                                    className={errors.nDni ? styles.error : ''}
                                    placeholder="12345678"
                                />
                                {errors.nDni && <span className={styles.errorMessage}>{errors.nDni}</span>}
                            </div>
                        </div>
                    </div>

                    
                    <div className={styles.section}>
                        <h3>Credenciales de Acceso</h3>
                        
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.credential.username}
                                onChange={handleChange}
                                className={errors.username ? styles.error : ''}
                                placeholder="Elige un nombre de usuario"
                            />
                            {errors.username && <span className={styles.errorMessage}>{errors.username}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Contraseña</label>
                            <div className={styles.passwordInputContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.credential.password}
                                    onChange={handleChange}
                                    className={errors.password ? styles.error : ''}
                                    placeholder="8+ caracteres, mayúscula, minúscula, número y símbolo"
                                />
                                <button
                                    type="button"
                                    className={styles.togglePasswordButton}
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 12S4 4 12 4S23 12 23 12S20 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 3L21 21M9.9 4.24C10.5 4.07 11.2 4 12 4C19 4 22 12 22 12C21.3 13.35 20.12 14.65 18.7 15.74M15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C12.55 9 13.05 9.16 13.47 9.41M1 12S4 4 12 4M2.83 5.17L6.9 9.31C6.33 10.13 6 11.05 6 12C6 15.31 8.69 18 12 18C12.95 18 13.83 17.67 14.69 17.1L18.83 21.17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <PasswordStrengthIndicator password={formData.credential.password} />
                            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
                        </div>
                    </div>

                    
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
