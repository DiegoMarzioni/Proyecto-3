"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentsByUserId = exports.getAppointmentById = exports.getAppointments = void 0;
const appointmentsService = __importStar(require("../services/appointmentsService"));
const class_validator_1 = require("class-validator");
const CreateAppointmentDto_1 = require("../dto/CreateAppointmentDto");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield appointmentsService.getAllAppointments();
    if (!appointments || appointments.length === 0) {
        res.status(404).json({ message: "No se encontraron turnos" });
        return;
    }
    res.status(200).json(appointments);
});
exports.getAppointments = getAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
    }
    const appointment = yield appointmentsService.getAppointmentById(id);
    if (!appointment) {
        res.status(404).json({ message: "Turno no encontrado" });
        return;
    }
    res.status(200).json(appointment);
});
exports.getAppointmentById = getAppointmentById;
const getAppointmentsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ message: "ID de usuario inválido" });
        return;
    }
    try {
        const appointments = yield appointmentsService.getAppointmentsByUserId(userId);
        if (!appointments || appointments.length === 0) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener turnos", error: error.message });
    }
});
exports.getAppointmentsByUserId = getAppointmentsByUserId;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = new CreateAppointmentDto_1.CreateAppointmentDto();
    Object.assign(dto, req.body);
    const errors = yield (0, class_validator_1.validate)(dto);
    if (errors.length > 0) {
        res.status(400).json({ message: "Datos inválidos", errors });
        return;
    }
    try {
        const appointment = yield appointmentsService.createAppointment(req.body);
        res.status(201).json(appointment);
    }
    catch (e) {
        res.status(400).json({ message: "Error al crear turno", error: e.message });
    }
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
    }
    const appointment = yield appointmentsService.cancelAppointment(id);
    if (!appointment) {
        res.status(404).json({ message: "Turno no encontrado" });
        return;
    }
    res.status(200).json(appointment);
});
exports.cancelAppointment = cancelAppointment;
