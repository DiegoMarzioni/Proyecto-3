import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { validateOnChange, validateField } from '../../helpers/formValidators';
import styles from './Login.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        
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

        
        const usernameError = validateField('username', formData.username, { required: true });
        if (usernameError) {
            newErrors.username = usernameError;
        }

        
        const passwordError = validateField('password', formData.password, { required: true });
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
            const response = await axios.post('http://localhost:3000/users/login', formData);
            
            
            if (response.data.access) {
                
                const userInfo = {
                    user: response.data.user,
                    loginTime: new Date().toISOString(),
                    access: true
                };
                
                localStorage.setItem('user', JSON.stringify(userInfo));
                
                
                await Swal.fire({
                    title: '¡Bienvenido!',
                    text: `Hola ${response.data.user.name}, iniciaste sesión correctamente`,
                    icon: 'success',
                    confirmButtonText: 'Continuar',
                    confirmButtonColor: '#ff6b6b',
                    timer: 2000,
                    timerProgressBar: true
                });
                
                
                setFormData({
                    username: '',
                    password: ''
                });

                
                navigate('/mis-turnos');
                
                window.dispatchEvent(new Event('authStateChanged'));

            } else {
                
                await Swal.fire({
                    title: 'Credenciales incorrectas',
                    text: response.data.message || 'Verifica tu usuario y contraseña',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo',
                    confirmButtonColor: '#ff6b6b'
                });
            }

        } catch (error) {
            console.error('Error en el login:', error);
            
            let errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.status === 400) {
                errorMessage = 'Credenciales incorrectas. Verifica tu usuario y contraseña.';
            } else if (error.response?.status === 500) {
                errorMessage = 'Error del servidor. Intenta más tarde.';
            }
            
            
            await Swal.fire({
                title: 'Error',
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
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h1>Iniciar Sesión</h1>
                    <p>Accede a tu cuenta de Studio Tattoo</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? styles.error : ''}
                            placeholder="Ingresa tu nombre de usuario"
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
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? styles.error : ''}
                                placeholder="Ingresa tu contraseña"
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
                        {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
                    <p><a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
