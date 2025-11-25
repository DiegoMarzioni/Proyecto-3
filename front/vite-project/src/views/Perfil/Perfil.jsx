import { useState, useEffect } from 'react';
import { getUserId, getLoggedUser } from '../../helpers/authHelpers';
import ProfilePictureUpload from '../../components/ProfilePictureUpload/ProfilePictureUpload';
import apiClient from '../../helpers/apiClient';
import Swal from 'sweetalert2';
import { formatDate } from '../../helpers/dateHelpers';
import styles from './Perfil.module.css';

const Perfil = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadUserInfo = async () => {
            const userId = getUserId();
            if (!userId) {
                setError('Usuario no identificado');
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get(`/users/${userId}`);
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error loading user info:', error);
                setError('Error al cargar información del usuario');
            } finally {
                setLoading(false);
            }
        };

        loadUserInfo();
    }, []);

    const handleProfilePictureUpdate = (newImageUrl) => {
        setUserInfo(prev => ({
            ...prev,
            profilePicture: newImageUrl
        }));
        
        const loggedUser = getLoggedUser();
        if (loggedUser && loggedUser.user) {
            loggedUser.user.profilePicture = newImageUrl;
            localStorage.setItem('user', JSON.stringify(loggedUser));
        }
    };

    const handleDeleteProfilePicture = async () => {
        const result = await Swal.fire({
            title: '¿Eliminar imagen de perfil?',
            text: 'Se eliminará tu foto de perfil actual. ¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const userId = getUserId();
                if (!userId) {
                    throw new Error('Usuario no identificado');
                }

                
                await apiClient.delete(`/users/${userId}/profile-picture`);
                
                
                setUserInfo(prev => ({
                    ...prev,
                    profilePicture: null
                }));
                
                
                const loggedUser = getLoggedUser();
                if (loggedUser && loggedUser.user) {
                    loggedUser.user.profilePicture = null;
                    localStorage.setItem('user', JSON.stringify(loggedUser));
                }

                Swal.fire({
                    title: '¡Imagen eliminada!',
                    text: 'Tu imagen de perfil ha sido eliminada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#28a745'
                });
            } catch (error) {
                console.error('Error deleting profile picture:', error);
                
                
                let errorMessage = 'No se pudo eliminar la imagen. Intenta nuevamente.';
                if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                Swal.fire({
                    title: 'Error',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#dc3545'
                });
            }
        }
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Cargando información del perfil...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Mi Perfil</h1>
            </div>

            <div className={styles.content}>
                <div className={styles.profileSection}>
                    <ProfilePictureUpload
                        currentProfilePicture={userInfo?.profilePicture}
                        onUploadSuccess={handleProfilePictureUpdate}
                    />
                    <div className={styles.profileButtons}>
                        <button 
                            className={styles.profileButton}
                            onClick={() => {
                                Swal.fire({
                                    title: 'Próximamente',
                                    text: 'La función de editar perfil estará disponible pronto.',
                                    icon: 'info',
                                    confirmButtonText: 'Entendido',
                                    confirmButtonColor: '#ff6b6b'
                                });
                            }}
                        >
                            ✏️ Editar Perfil
                        </button>
                        <button 
                            className={`${styles.profileButton} ${styles.danger}`}
                            onClick={handleDeleteProfilePicture}
                            disabled={!userInfo?.profilePicture}
                        >
                            🗑️ Eliminar Imagen
                        </button>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h2>Información Personal</h2>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <label>👤 Nombre:</label>
                            <span>{userInfo?.name || 'No disponible'}</span>
                        </div>
                        
                        <div className={styles.infoItem}>
                            <label>📧 Email:</label>
                            <span>{userInfo?.email || 'No disponible'}</span>
                        </div>
                        
                        <div className={styles.infoItem}>
                            <label>🆔 DNI:</label>
                            <span>{userInfo?.nDni || 'No disponible'}</span>
                        </div>
                        
                        <div className={styles.infoItem}>
                            <label>🎂 Fecha de nacimiento:</label>
                            <span>
                                {userInfo?.birthdate 
                                    ? formatDate(userInfo.birthdate)
                                    : 'No disponible'
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
