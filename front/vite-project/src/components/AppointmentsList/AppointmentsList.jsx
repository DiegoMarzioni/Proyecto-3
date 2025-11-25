import AppointmentCard from '../AppointmentCard/AppointmentCard';
import styles from './AppointmentsList.module.css';

const AppointmentsList = ({ appointments, onCancelAppointment, cancellingId }) => {
    if (appointments.length === 0) {
        return (
            <div className={styles.noAppointments}>
                <p>No tienes turnos programados</p>
            </div>
        );
    }

    return (
        <div className={styles.cardsContainer}>
            {appointments.map((appointment) => (
                <AppointmentCard 
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={onCancelAppointment}
                    isCancelling={cancellingId === appointment.id}
                />
            ))}
        </div>
    );
};

export default AppointmentsList;
