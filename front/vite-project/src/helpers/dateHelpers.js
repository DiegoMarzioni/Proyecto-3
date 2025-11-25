
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const LOCAL_TIMEZONE = 'America/Argentina/Buenos_Aires';

export const formatDate = (dateString) => {
    if (!dateString) return '';
    return dayjs(dateString).tz(LOCAL_TIMEZONE).format('DD/MM/YYYY');
};

export const formatDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) return '';
    const dateTime = `${dateString} ${timeString}`;
    return dayjs(dateTime).tz(LOCAL_TIMEZONE).format('DD/MM/YYYY [a las] HH:mm');
};

export const createLocalDate = (dateString) => {
    if (!dateString) return null;
    return dayjs(dateString).tz(LOCAL_TIMEZONE).toDate();
};

export const getTodayDateString = () => {
    return dayjs().tz(LOCAL_TIMEZONE).format('YYYY-MM-DD');
};

export const isDateBeforeToday = (dateString) => {
    if (!dateString) return false;
    const inputDate = dayjs(dateString).tz(LOCAL_TIMEZONE);
    const today = dayjs().tz(LOCAL_TIMEZONE).startOf('day');
    return inputDate.isBefore(today);
};

export const parseDisplayDateToISO = (displayDate) => {
    if (!displayDate) return '';
    return dayjs(displayDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

export const parseISOToDisplayDate = (isoDate) => {
    if (!isoDate) return '';
    return dayjs(isoDate).format('DD/MM/YYYY');
};

export const isAppointmentPast = (dateString, timeString) => {
    if (!dateString || !timeString) return false;
    const appointmentDateTime = dayjs(`${dateString} ${timeString}`).tz(LOCAL_TIMEZONE);
    const now = dayjs().tz(LOCAL_TIMEZONE);
    return now.isAfter(appointmentDateTime);
};

export const canCancelAppointment = (dateString) => {
    if (!dateString) return false;
    const appointmentDate = dayjs(dateString).tz(LOCAL_TIMEZONE).startOf('day');
    const tomorrow = dayjs().tz(LOCAL_TIMEZONE).add(1, 'day').startOf('day');
    return appointmentDate.isAfter(tomorrow) || appointmentDate.isSame(tomorrow);
};

export const isWeekend = (dateString) => {
    if (!dateString) return false;
    const date = dayjs(dateString);
    const dayOfWeek = date.day();
    return dayOfWeek === 0 || dayOfWeek === 6;
};


export const isDateTimePast = (dateString, timeString) => {
    if (!dateString || !timeString) return false;
    const appointmentDateTime = dayjs(`${dateString} ${timeString}`).tz(LOCAL_TIMEZONE);
    const now = dayjs().tz(LOCAL_TIMEZONE);
    return now.isAfter(appointmentDateTime);
};
