"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentsByUserId = exports.getAppointmentById = exports.getAllAppointments = void 0;
const data_source_1 = require("../config/data-source");
const Appointment_1 = require("../entities/Appointment");
const User_1 = require("../entities/User");
const emailService_1 = require("./emailService");
const dateUtils_1 = require("../utils/dateUtils");
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).find({
        relations: ["user"],
    });
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).findOne({
        where: { id },
        relations: ["user"],
    });
});
exports.getAppointmentById = getAppointmentById;
const getAppointmentsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).find({
        where: { user: { id: userId } },
        relations: ["user"],
        order: { date: "DESC", time: "DESC" }
    });
});
exports.getAppointmentsByUserId = getAppointmentsByUserId;
const createAppointment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({
        id: data.userId,
    });
    if (!user)
        throw new Error("Usuario no encontrado");
    if (!(0, dateUtils_1.isValidISODate)(data.date)) {
        throw new Error("Formato de fecha inválido");
    }
    if (!(0, dateUtils_1.isFutureDate)(data.date)) {
        throw new Error("No se pueden agendar turnos para fechas pasadas");
    }
    if ((0, dateUtils_1.isDateTimePast)(data.date, data.time)) {
        throw new Error("No se pueden agendar turnos para fecha y hora que ya pasaron");
    }
    const [year, month, day] = data.date.split('-').map(Number);
    const appointmentDate = new Date(year, month - 1, day);
    const dayOfWeek = appointmentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6)
        throw new Error("No se pueden agendar turnos en fin de semana");
    const [hour, minute] = data.time.split(":").map(Number);
    if (hour < 9 || hour >= 18)
        throw new Error("El turno debe estar dentro del horario de atención (09:00-18:00)");
    const repo = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
    const appointment = repo.create({
        date: data.date,
        time: data.time,
        user,
        status: "active",
    });
    yield repo.save(appointment);
    try {
        const htmlTemplate = (0, emailService_1.getConfirmationEmailTemplate)(user.name, (0, dateUtils_1.formatDateTimeForEmail)(data.date, data.time).split(' a las ')[0], (0, dateUtils_1.formatDateTimeForEmail)(data.date, data.time).split(' a las ')[1]);
        yield (0, emailService_1.sendEmail)(user.email, "✅ Confirmación de turno - Estudio de Tatuajes", `Tu turno fue reservado para el ${(0, dateUtils_1.formatDateTimeForEmail)(data.date, data.time)}.`, htmlTemplate);
    }
    catch (e) {
        console.error("No se pudo enviar el email de confirmación:", e);
    }
    return appointment;
});
exports.createAppointment = createAppointment;
const cancelAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
    const appointment = yield repo.findOne({
        where: { id },
        relations: ["user"],
    });
    if (!appointment)
        return null;
    if (!(0, dateUtils_1.canCancelAppointment)(appointment.date)) {
        throw new Error("Solo puedes cancelar turnos hasta el día anterior al turno");
    }
    appointment.status = "cancelled";
    yield repo.save(appointment);
    try {
        const htmlTemplate = (0, emailService_1.getCancellationEmailTemplate)(appointment.user.name, (0, dateUtils_1.formatDateTimeForEmail)(appointment.date, appointment.time).split(' a las ')[0], (0, dateUtils_1.formatDateTimeForEmail)(appointment.date, appointment.time).split(' a las ')[1]);
        yield (0, emailService_1.sendEmail)(appointment.user.email, "❌ Cancelación de turno - Estudio de Tatuajes", `Tu turno del ${(0, dateUtils_1.formatDateTimeForEmail)(appointment.date, appointment.time)} fue cancelado.`, htmlTemplate);
    }
    catch (e) {
        console.error("No se pudo enviar el email de cancelación:", e);
    }
    return appointment;
});
exports.cancelAppointment = cancelAppointment;
