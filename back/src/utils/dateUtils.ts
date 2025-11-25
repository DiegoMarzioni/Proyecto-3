import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const LOCAL_TIMEZONE = 'America/Argentina/Buenos_Aires';

export const formatDateForEmail = (dateString: string): string => {
    if (!dateString) return '';
    return dayjs(dateString).tz(LOCAL_TIMEZONE).format('DD/MM/YYYY');
};

export const formatDateTimeForEmail = (dateString: string, timeString: string): string => {
    if (!dateString || !timeString) return '';
    const dateTime = `${dateString} ${timeString}`;
    return dayjs(dateTime).tz(LOCAL_TIMEZONE).format('DD/MM/YYYY [a las] HH:mm');
};

export const parseDisplayDateToISO = (displayDate: string): string => {
    if (!displayDate) return '';
    return dayjs(displayDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

export const getCurrentDateISO = (): string => {
    return dayjs().tz(LOCAL_TIMEZONE).format('YYYY-MM-DD');
};

export const isValidISODate = (dateString: string): boolean => {
    if (!dateString) return false;
    const date = dayjs(dateString, 'YYYY-MM-DD', true);
    return date.isValid();
};

export const isFutureDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const inputDate = dayjs(dateString).tz(LOCAL_TIMEZONE);
    const today = dayjs().tz(LOCAL_TIMEZONE).startOf('day');
    return inputDate.isAfter(today) || inputDate.isSame(today);
};

export const canCancelAppointment = (dateString: string): boolean => {
    if (!dateString) return false;
    const appointmentDate = dayjs(dateString).tz(LOCAL_TIMEZONE).startOf('day');
    const tomorrow = dayjs().tz(LOCAL_TIMEZONE).add(1, 'day').startOf('day');
    
    return appointmentDate.isAfter(tomorrow);
};


export const isDateTimePast = (dateString: string, timeString: string): boolean => {
    if (!dateString || !timeString) return false;
    const appointmentDateTime = dayjs(`${dateString} ${timeString}`).tz(LOCAL_TIMEZONE);
    const now = dayjs().tz(LOCAL_TIMEZONE);
    return now.isAfter(appointmentDateTime);
};
