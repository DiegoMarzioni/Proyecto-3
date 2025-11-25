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
exports.checkUniqueUserFields = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const checkUniqueUserFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nDni, credential } = req.body;
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const credentialRepo = data_source_1.AppDataSource.getRepository(Credential_1.Credential);
    if (email) {
        const existingEmail = yield userRepo.findOneBy({ email });
        if (existingEmail) {
            res.status(400).json({ message: "El email ya está registrado" });
            return;
        }
    }
    if (nDni) {
        const existingDni = yield userRepo.findOneBy({ nDni });
        if (existingDni) {
            res.status(400).json({ message: "El nDni ya está registrado" });
            return;
        }
    }
    if (credential && credential.username) {
        const existingUsername = yield credentialRepo.findOneBy({
            username: credential.username,
        });
        if (existingUsername) {
            res.status(400).json({ message: "El username ya está registrado" });
            return;
        }
    }
    next();
});
exports.checkUniqueUserFields = checkUniqueUserFields;
