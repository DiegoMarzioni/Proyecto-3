import { useState } from 'react';
import apiClient from '../../helpers/apiClient';
import Swal from 'sweetalert2';
import { getUserId } from '../../helpers/authHelpers';
import { getTodayDateString, isDateBeforeToday, isWeekend, isDateTimePast } from '../../helpers/dateHelpers';
import styles from './CrearTurno.module.css';

const CrearTurno = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.date) {
            newErrors.date = 'La fecha es requerida';
        } else if (isDateBeforeToday(formData.date)) {
            newErrors.date = 'No puedes seleccionar una fecha pasada';
        } else if (isWeekend(formData.date)) {
            newErrors.date = 'Solo se pueden agendar turnos de lunes a viernes';
        }

        if (!formData.time) {
            newErrors.time = 'La hora es requerida';
        }

        
        if (formData.date && formData.time && isDateTimePast(formData.date, formData.time)) {
            newErrors.time = 'No se pueden crear turnos para fechas y horas que ya pasaron';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es requerida';
        }

        setErrors(newErrors);
        
        
        if (Object.keys(newErrors).length > 0) {
            const errorMessages = Object.values(newErrors).join('\n• ');
            Swal.fire({
                title: 'Errores de validación',
                html: `<div style="text-align: left;">Por favor corrige los siguientes errores:<br><br>• ${errorMessages.replace(/\n• /g, '<br>• ')}</div>`,
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#f44336'
            });
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const userId = getUserId();
        if (!userId) {
            Swal.fire({
                title: 'Error de autenticación',
                text: 'Usuario no identificado. Por favor, inicia sesión nuevamente.',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#f44336'
            });
            return;
        }

        setLoading(true);

        try {
            const appointmentData = {
                date: formData.date,
                time: formData.time,
                description: formData.description,
                userId: userId
            };

            await apiClient.post('/turns/schedule', appointmentData);
            
            Swal.fire({
                title: '¡Turno creado exitosamente!',
                text: 'Podrás verlo en "Mis Turnos".',
                icon: 'success',
                confirmButtonText: 'Perfecto',
                confirmButtonColor: '#4CAF50'
            });
            
            
            setFormData({
                date: '',
                time: '',
                description: ''
            });

        } catch (error) {
            console.error('Error al crear el turno:', error);
            
            let errorTitle = 'Error al crear el turno';
            let errorMessage = 'Error al crear el turno. Intenta nuevamente.';
            let errorIcon = 'error';
            
            if (error.response?.data?.error) {
                const backendError = error.response.data.error;
                
                
                if (backendError.includes('fin de semana') || backendError.includes('weekend')) {
                    errorTitle = '📅 Solo días hábiles';
                    errorMessage = 'Los turnos solo pueden agendarse de lunes a viernes. Por favor, selecciona una fecha entre lunes y viernes.';
                    errorIcon = 'info';
                }
                
                else if (backendError.includes('horario de atención')) {
                    errorTitle = '🕐 Horario de atención';
                    errorMessage = 'Los turnos deben estar dentro del horario de atención (09:00 - 18:00). Por favor, selecciona un horario válido.';
                    errorIcon = 'warning';
                }
                
                else if (backendError.includes('fechas pasadas') || backendError.includes('fecha y hora que ya pasaron')) {
                    errorTitle = '⏰ Fecha/hora no válida';
                    errorMessage = 'No se pueden agendar turnos para fechas y horas que ya pasaron. Por favor, selecciona una fecha y hora futuras.';
                    errorIcon = 'warning';
                }
                
                else {
                    errorMessage = backendError;
                }
            }
            
            else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            Swal.fire({
                title: errorTitle,
                text: errorMessage,
                icon: errorIcon,
                confirmButtonText: 'Entendido',
                confirmButtonColor: errorIcon === 'error' ? '#f44336' : '#2196F3'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Crear Nuevo Turno</h1>
                <p>Agenda tu cita en Studio Tattoo</p>
            </div>

            <div className={styles.formCard}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="date">Fecha del Turno</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={errors.date ? styles.error : ''}
                            min={getTodayDateString()}
                        />
                        <small style={{ color: '#666', fontSize: '0.85em', marginTop: '4px' }}>
                            📅 Solo disponible de lunes a viernes
                        </small>
                        {errors.date && <span className={styles.errorMessage}>{errors.date}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="time">Hora del Turno</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className={errors.time ? styles.error : ''}
                            min="09:00"
                            max="18:00"
                        />
                        <small style={{ color: '#666', fontSize: '0.85em', marginTop: '4px' }}>
                            🕐 Horario de atención: 9:00 AM - 6:00 PM
                        </small>
                        {errors.time && <span className={styles.errorMessage}>{errors.time}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="description">Descripción del Servicio</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={errors.description ? styles.error : ''}
                            placeholder="Describe el tipo de tatuaje o servicio que deseas..."
                            rows="4"
                        />
                        {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
                    </div>

                    
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Creando Turno...' : 'Crear Turno'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CrearTurno;
