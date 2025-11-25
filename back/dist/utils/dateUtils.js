"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateTimePast = exports.canCancelAppointment = exports.isFutureDate = exports.isValidISODate = exports.getCurrentDateISO = exports.parseDisplayDateToISO = exports.formatDateTimeForEmail = exports.formatDateForEmail = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(customParseFormat_1.default);
const LOCAL_TIMEZONE = 'America/Argentina/Buenos_Aires';
const formatDateForEmail = (dateString) => {
    if (!dateString)
        return '';
    return (0, dayjs_1.default)(dateString).tz(LOCAL_TIMEZONE).format('DD/MM/YYYY');
};
exports.formatDateForEmail = formatDateForEmail;
const formatDateTimeForEmail = (dateString, timeString) => {
    if (!dateString || !timeString)
        return '';
    const dateTime = `${dateString} ${timeString}`;
    return (0, dayjs_1.default)(dateTime).tz(LOCAL_TIMEZONE).format('DD/MM/YYYY [a las] HH:mm');
};
exports.formatDateTimeForEmail = formatDateTimeForEmail;
const parseDisplayDateToISO = (displayDate) => {
    if (!displayDate)
        return '';
    return (0, dayjs_1.default)(displayDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
};
exports.parseDisplayDateToISO = parseDisplayDateToISO;
const getCurrentDateISO = () => {
    return (0, dayjs_1.default)().tz(LOCAL_TIMEZONE).format('YYYY-MM-DD');
};
exports.getCurrentDateISO = getCurrentDateISO;
const isValidISODate = (dateString) => {
    if (!dateString)
        return false;
    const date = (0, dayjs_1.default)(dateString, 'YYYY-MM-DD', true);
    return date.isValid();
};
exports.isValidISODate = isValidISODate;
const isFutureDate = (dateString) => {
    if (!dateString)
        return false;
    const inputDate = (0, dayjs_1.default)(dateString).tz(LOCAL_TIMEZONE);
    const today = (0, dayjs_1.default)().tz(LOCAL_TIMEZONE).startOf('day');
    return inputDate.isAfter(today) || inputDate.isSame(today);
};
exports.isFutureDate = isFutureDate;
const canCancelAppointment = (dateString) => {
    if (!dateString)
        return false;
    const appointmentDate = (0, dayjs_1.default)(dateString).tz(LOCAL_TIMEZONE).startOf('day');
    const tomorrow = (0, dayjs_1.default)().tz(LOCAL_TIMEZONE).add(1, 'day').startOf('day');
    return appointmentDate.isAfter(tomorrow) || appointmentDate.isSame(tomorrow);
};
exports.canCancelAppointment = canCancelAppointment;
const isDateTimePast = (dateString, timeString) => {
    if (!dateString || !timeString)
        return false;
    const appointmentDateTime = (0, dayjs_1.default)(`${dateString} ${timeString}`).tz(LOCAL_TIMEZONE);
    const now = (0, dayjs_1.default)().tz(LOCAL_TIMEZONE);
    return now.isAfter(appointmentDateTime);
};
exports.isDateTimePast = isDateTimePast;
