import { Router } from "express";
import {
    getAppointments,
    getAppointmentById,
    getAppointmentsByUserId,
    scheduleAppointment,
    cancelAppointment,
} from "../controllers/appointmentsController";
import auth from "../middlewares/auth";

const router = Router();

router.get("/", getAppointments);
router.get("/user/:userId", getAppointmentsByUserId);
router.get("/:id", getAppointmentById);
router.post("/schedule", auth, scheduleAppointment);
router.put("/cancel/:id", auth, cancelAppointment);

export default router;