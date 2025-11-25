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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByCredentialId = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dateUtils_1 = require("../utils/dateUtils");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(User_1.User).find({
        relations: ["credential", "appointments"],
    });
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(User_1.User).findOne({
        where: { id },
        relations: ["credential", "appointments"],
    });
});
exports.getUserById = getUserById;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const credentialRepo = manager.getRepository(Credential_1.Credential);
        const userRepo = manager.getRepository(User_1.User);
        const hashedPassword = yield bcrypt_1.default.hash(data.credential.password, 10);
        const credential = credentialRepo.create({
            username: data.credential.username,
            password: hashedPassword,
        });
        yield credentialRepo.save(credential);
        let birthdateISO = data.birthdate;
        if (data.birthdate.includes('/')) {
            birthdateISO = (0, dateUtils_1.parseDisplayDateToISO)(data.birthdate);
        }
        if (!(0, dateUtils_1.isValidISODate)(birthdateISO)) {
            throw new Error('Formato de fecha de nacimiento inválido');
        }
        const user = userRepo.create({
            name: data.name,
            email: data.email,
            birthdate: birthdateISO,
            nDni: data.nDni,
            credential,
        });
        yield userRepo.save(user);
        return user;
    }));
});
exports.createUser = createUser;
const getUserByCredentialId = (credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(User_1.User).findOne({
        where: { credential: { id: credentialId } },
        relations: ["credential", "appointments"],
    });
});
exports.getUserByCredentialId = getUserByCredentialId;
