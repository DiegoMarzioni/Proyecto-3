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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfilePicture = exports.uploadProfilePicture = exports.loginUser = exports.registerUser = exports.getUserById = exports.getUsers = void 0;
const usersService = __importStar(require("../services/usersService"));
const credentialsService = __importStar(require("../services/credentialsService"));
const class_validator_1 = require("class-validator");
const CreateUserDto_1 = require("../dto/CreateUserDto");
const class_transformer_1 = require("class-transformer");
const multer_1 = __importDefault(require("multer"));
const uploadImage_1 = require("../services/uploadImage");
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const fs_1 = __importDefault(require("fs"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield usersService.getAllUsers();
    if (!users || users.length === 0) {
        res.status(404).json({ message: "No se encontraron usuarios" });
        return;
    }
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "ID inválido" });
        return;
    }
    const user = yield usersService.getUserById(id);
    if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    }
    res.status(200).json(user);
});
exports.getUserById = getUserById;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = (0, class_transformer_1.plainToInstance)(CreateUserDto_1.CreateUserDto, req.body);
    const errors = yield (0, class_validator_1.validate)(dto);
    if (errors.length > 0) {
        res.status(400).json({ message: "Datos inválidos", errors });
        return;
    }
    try {
        const user = yield usersService.createUser(req.body);
        res.status(201).json(user);
    }
    catch (e) {
        res.status(400).json({ message: "Error al crear usuario", error: e.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ access: false, message: "Faltan datos" });
        return;
    }
    const credentialId = yield credentialsService.validateCredential(username, password);
    if (!credentialId) {
        res.status(400).json({ access: false, message: "Credenciales incorrectas" });
        return;
    }
    const user = yield usersService.getUserByCredentialId(credentialId);
    if (!user) {
        res.status(400).json({ access: false, message: "Usuario no encontrado" });
        return;
    }
    res.status(200).json({ access: true, user });
});
exports.loginUser = loginUser;
exports.uploadProfilePicture = [
    upload.single("image"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = Number(req.params.id);
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        if (!req.file) {
            res.status(400).json({ message: "No se subió ninguna imagen" });
            return;
        }
        try {
            const result = yield (0, uploadImage_1.uploadImage)(req.file.path);
            user.profilePicture = result.secure_url;
            yield userRepo.save(user);
            fs_1.default.unlinkSync(req.file.path);
            res.status(200).json({ message: "Imagen subida", url: result.secure_url });
            return;
        }
        catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            res.status(500).json({ message: "Error al subir imagen", error: errorMsg });
            return;
        }
    }),
];
const deleteProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ message: "ID de usuario inválido" });
        return;
    }
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        if (!user.profilePicture) {
            res.status(400).json({ message: "El usuario no tiene imagen de perfil" });
            return;
        }
        user.profilePicture = null;
        yield userRepo.save(user);
        res.status(200).json({
            message: "Imagen de perfil eliminada correctamente",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            message: "Error al eliminar imagen de perfil",
            error: errorMsg
        });
    }
});
exports.deleteProfilePicture = deleteProfilePicture;
