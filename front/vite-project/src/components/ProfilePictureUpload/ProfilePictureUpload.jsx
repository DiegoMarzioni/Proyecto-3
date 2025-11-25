import { useState, useEffect } from 'react';
import apiClient from '../../helpers/apiClient';
import { getUserId } from '../../helpers/authHelpers';
import Swal from 'sweetalert2';
import styles from './ProfilePictureUpload.module.css';

const ProfilePictureUpload = ({ currentProfilePicture, onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(currentProfilePicture || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    
    useEffect(() => {
        setPreviewUrl(currentProfilePicture || null);
        setSelectedFile(null); 
    }, [currentProfilePicture]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('El archivo debe ser menor a 5MB');
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                setError('Solo se permiten archivos de imagen');
                return;
            }

            setSelectedFile(file);
            setError('');
            
            const reader = new FileReader();
            reader.onload = (e) => setPreviewUrl(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const userId = getUserId();
        if (!userId) {
            setError('Usuario no identificado');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await apiClient.post(`/users/${userId}/profile-picture`, formData);

            if (onUploadSuccess) {
                onUploadSuccess(response.data.url);
            }
            
            setSelectedFile(null);

            
            Swal.fire({
                title: '¡Imagen cargada correctamente!',
                text: 'Tu imagen de perfil ha sido actualizada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#28a745'
            });

        } catch (error) {
            console.error('Error uploading image:', error);
            setError(error.response?.data?.message || 'Error al subir la imagen');
            
            
            Swal.fire({
                title: 'Error al subir imagen',
                text: error.response?.data?.message || 'No se pudo subir la imagen. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#dc3545'
            });
        } finally {
            setUploading(false);
        }
    };

    const resetPreview = () => {
        setSelectedFile(null);
        setPreviewUrl(currentProfilePicture || null);
        setError('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.previewContainer}>
                {previewUrl ? (
                    <img 
                        src={previewUrl} 
                        alt="Profile preview" 
                        className={styles.preview}
                    />
                ) : (
                    <div className={styles.placeholder}>
                        <span>Sin foto de perfil</span>
                    </div>
                )}
            </div>

            <div className={styles.controls}>
                <label className={styles.fileInput}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileSelect}
                        disabled={uploading}
                    />
                    <span>Seleccionar imagen</span>
                </label>

                {selectedFile && (
                    <div className={styles.actions}>
                        <button 
                            onClick={handleUpload} 
                            disabled={uploading}
                            className={styles.uploadBtn}
                        >
                            {uploading ? 'Subiendo...' : 'Subir imagen'}
                        </button>
                        <button 
                            onClick={resetPreview}
                            disabled={uploading}
                            className={styles.cancelBtn}
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </div>

            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default ProfilePictureUpload;
