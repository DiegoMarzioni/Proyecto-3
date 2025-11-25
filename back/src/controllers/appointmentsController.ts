import { Request, Response } from "express";
import * as appointmentsService from "../services/appointmentsService";
import { validate } from "class-validator";
import { CreateAppointmentDto } from "../dto/CreateAppointmentDto";

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  const appointments = await appointmentsService.getAllAppointments();
  if (!appointments || appointments.length === 0) {
    res.status(404).json({ message: "No se encontraron turnos" });
    return;
  }
  res.status(200).json(appointments);
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }
  const appointment = await appointmentsService.getAppointmentById(id);
  if (!appointment) {
    res.status(404).json({ message: "Turno no encontrado" });
    return;
  }
  res.status(200).json(appointment);
};

export const getAppointmentsByUserId = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).json({ message: "ID de usuario inválido" });
    return;
  }
  
  try {
    const appointments = await appointmentsService.getAppointmentsByUserId(userId);
    if (!appointments || appointments.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener turnos", error: error.message });
  }
};

export const scheduleAppointment = async (req: Request, res: Response): Promise<void> => {
  const dto = new CreateAppointmentDto();
  Object.assign(dto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    res.status(400).json({ message: "Datos inválidos", errors });
    return;
  }

  try {
    const appointment = await appointmentsService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (e: any) {
    res.status(400).json({ message: "Error al crear turno", error: e.message });
  }
};

export const cancelAppointment = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }
  const appointment = await appointmentsService.cancelAppointment(id);
  if (!appointment) {
    res.status(404).json({ message: "Turno no encontrado" });
    return;
  }
  res.status(200).json(appointment);
};