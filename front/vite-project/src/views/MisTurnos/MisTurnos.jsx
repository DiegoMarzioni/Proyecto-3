import { useEffect, useState } from "react";
import apiClient from '../../helpers/apiClient';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getUserId, getUserName } from '../../helpers/authHelpers';
import styles from './MisTurnos.module.css';
import AppointmentsList from '../../components/AppointmentsList/AppointmentsList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MisTurnos = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  
  const userId = getUserId();
  const userName = getUserName();

  useEffect(() => {
    if (!userId) {
      setError('Usuario no identificado. Por favor, inicia sesión nuevamente.');
      setLoading(false);
      return;
    }

    
    apiClient.get(`/turns/user/${userId}`)
      .then((response) => {
        let appointmentsData = [];
        
        if (response.data.data && Array.isArray(response.data.data)) {
          appointmentsData = response.data.data;
        } else if (Array.isArray(response.data)) {
          appointmentsData = response.data;
        } else if (response.data && response.data.appointments) {
          appointmentsData = response.data.appointments;
        }
        
        const processedAppointments = appointmentsData.map(appointment => {
          return {
            ...appointment,
          };
        });
        
        setCitas(processedAppointments);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener citas del servidor:', error);
        if (error.response?.status === 404) {
          setCitas([]);
          setLoading(false);
        } else {
          setError('No se pudo conectar con el servidor.');
          setLoading(false);
        }
      });
  }, [userId]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const appointment = citas.find(cita => cita.id === appointmentId);
      if (appointment) {
        
        const appointmentDate = new Date(appointment.date);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        
        appointmentDate.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);
        
        
        if (appointmentDate <= tomorrow) {
          Swal.fire({
            title: 'No se puede cancelar',
            text: 'Solo puedes cancelar turnos hasta el día anterior al turno programado.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#f44336'
          });
          return;
        }
      }

      setCancellingId(appointmentId);

      Swal.fire({
        title: 'Cancelando turno...',
        text: 'Por favor espera mientras procesamos tu solicitud',
        icon: 'info',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await apiClient.put(`/turns/cancel/${appointmentId}`);
      
      setCitas(prevCitas => 
        prevCitas.map(cita => 
          cita.id === appointmentId 
            ? { ...cita, status: 'cancelled' }
            : cita
        )
      );
      
      Swal.fire({
        title: '¡Turno cancelado!',
        text: 'El turno se ha cancelado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#4CAF50'
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      
      // Mostrar el mensaje específico del backend si está disponible
      const errorMessage = error.response?.data?.message || 'Error al cancelar el turno. Por favor intenta nuevamente.';
      
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#f44336'
      });
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mis Turnos</h1>
        {userName && <p className={styles.userGreeting}>Bienvenido, {userName}</p>}
        <div className={styles.actions}>
          <Link to="/crear-turno" className={styles.createButton}>
            + Crear Nuevo Turno
          </Link>
        </div>
        <ErrorMessage message={error} />
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <AppointmentsList 
          appointments={citas}
          onCancelAppointment={handleCancelAppointment}
          cancellingId={cancellingId}
        />
      )}
      
    </div>
  );
};

export default MisTurnos;
