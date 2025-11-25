import styles from './AppointmentCard.module.css';
import { formatDate, isAppointmentPast, canCancelAppointment } from '../../helpers/dateHelpers';

const AppointmentCard = ({ appointment, onCancel, isCancelling }) => {
    const handleCancel = () => {
        if (onCancel) {
            onCancel(appointment.id);
        }
    };

    const getEffectiveStatus = () => {
        if (appointment.status === 'cancelled') {
            return 'cancelled';
        } else if (isAppointmentPast(appointment.date, appointment.time)) {
            return 'completed';
        } else {
            return 'active';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active':
                return 'Activo';
            case 'cancelled':
                return 'Cancelado';
            case 'completed':
                return 'Finalizado';
            default:
                return status;
        }
    };

    const effectiveStatus = getEffectiveStatus();

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3>Turno #{appointment.id}</h3>
                <span className={`${styles.status} ${styles[effectiveStatus]}`}>
                    {getStatusText(effectiveStatus)}
                </span>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.dateTime}>
                    <div className={styles.date}>
                        <strong>Fecha:</strong> {formatDate(appointment.date)}
                    </div>
                    <div className={styles.time}>
                        <strong>Hora:</strong> {appointment.time}
                    </div>
                </div>
                {appointment.user && (
                    <div className={styles.userInfo}>
                        <strong>Usuario:</strong> {appointment.user.name}
                    </div>
                )}
            </div>
            <div className={styles.cardActions}>
                {effectiveStatus === 'active' && canCancelAppointment(appointment.date) && (
                    <button 
                        className={styles.cancelButton}
                        onClick={handleCancel}
                        disabled={isCancelling}
                    >
                        {isCancelling ? 'Cancelando...' : 'Cancelar Turno'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AppointmentCard;
