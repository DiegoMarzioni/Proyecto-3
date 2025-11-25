import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { sendEmail, getConfirmationEmailTemplate, getCancellationEmailTemplate } from "./emailService";
import { formatDateTimeForEmail, isValidISODate, isFutureDate, canCancelAppointment, isDateTimePast } from "../utils/dateUtils";

export const getAllAppointments = async () => {
  return await AppDataSource.getRepository(Appointment).find({
    relations: ["user"],
  });
};

export const getAppointmentById = async (id: number) => {
  return await AppDataSource.getRepository(Appointment).findOne({
    where: { id },
    relations: ["user"],
  });
};

export const getAppointmentsByUserId = async (userId: number) => {
  return await AppDataSource.getRepository(Appointment).find({
    where: { user: { id: userId } },
    relations: ["user"],
    order: { date: "DESC", time: "DESC" } 
  });
};

export const createAppointment = async (data: {
  date: string;
  time: string;
  userId: number;
}) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: data.userId,
  });
  if (!user) throw new Error("Usuario no encontrado");

  if (!isValidISODate(data.date)) {
    throw new Error("Formato de fecha inválido");
  }

  if (!isFutureDate(data.date)) {
    throw new Error("No se pueden agendar turnos para fechas pasadas");
  }

  
  if (isDateTimePast(data.date, data.time)) {
    throw new Error("No se pueden agendar turnos para fecha y hora que ya pasaron");
  }

  
  const appointmentRepo = AppDataSource.getRepository(Appointment);
  const existingAppointment = await appointmentRepo.findOne({
    where: {
      date: data.date,
      time: data.time,
      user: { id: data.userId },
      status: "active" 
    },
    relations: ["user"]
  });

  if (existingAppointment) {
    throw new Error("Ya tienes un turno reservado para esta fecha y hora. Si necesitas reagendar, cancela el turno existente primero.");
  }

  const [year, month, day] = data.date.split('-').map(Number);
  const appointmentDate = new Date(year, month - 1, day);
  const dayOfWeek = appointmentDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6)
    throw new Error("No se pueden agendar turnos en fin de semana");

  const [hour, minute] = data.time.split(":").map(Number);
  if (hour < 9 || hour >= 18)
    throw new Error(
      "El turno debe estar dentro del horario de atención (09:00-18:00)"
    );

  const repo = AppDataSource.getRepository(Appointment);
  const appointment = repo.create({
    date: data.date,
    time: data.time,
    user,
    status: "active",
  });
  await repo.save(appointment);

  try {
    const htmlTemplate = getConfirmationEmailTemplate(
      user.name,
      formatDateTimeForEmail(data.date, data.time).split(' a las ')[0],
      formatDateTimeForEmail(data.date, data.time).split(' a las ')[1]
    );
    await sendEmail(
      user.email,
      "✅ Confirmación de turno - Estudio de Tatuajes",
      `Tu turno fue reservado para el ${formatDateTimeForEmail(data.date, data.time)}.`,
      htmlTemplate
    );
  } catch (e) {
    console.error("No se pudo enviar el email de confirmación:", e);
  }

  return appointment;
};

export const cancelAppointment = async (id: number) => {
  const repo = AppDataSource.getRepository(Appointment);
  const appointment = await repo.findOne({
    where: { id },
    relations: ["user"],
  });
  if (!appointment) return null;

  if (!canCancelAppointment(appointment.date)) {
    throw new Error("Solo puedes cancelar turnos hasta el día anterior al turno");
  }

  appointment.status = "cancelled";
  await repo.save(appointment);

  try {
    const htmlTemplate = getCancellationEmailTemplate(
      appointment.user.name,
      formatDateTimeForEmail(appointment.date, appointment.time).split(' a las ')[0],
      formatDateTimeForEmail(appointment.date, appointment.time).split(' a las ')[1]
    );
    await sendEmail(
      appointment.user.email,
      "❌ Cancelación de turno - Estudio de Tatuajes",
      `Tu turno del ${formatDateTimeForEmail(appointment.date, appointment.time)} fue cancelado.`,
      htmlTemplate
    );
  } catch (e) {
    console.error("No se pudo enviar el email de cancelación:", e);
  }

  return appointment;
};
