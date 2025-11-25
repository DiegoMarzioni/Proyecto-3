"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get("/", appointmentsController_1.getAppointments);
router.get("/user/:userId", appointmentsController_1.getAppointmentsByUserId);
router.get("/:id", appointmentsController_1.getAppointmentById);
router.post("/schedule", auth_1.default, appointmentsController_1.scheduleAppointment);
router.put("/cancel/:id", auth_1.default, appointmentsController_1.cancelAppointment);
exports.default = router;
