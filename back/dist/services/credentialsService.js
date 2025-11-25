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
exports.validateCredential = exports.createCredential = void 0;
const data_source_1 = require("../config/data-source");
const Credential_1 = require("../entities/Credential");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createCredential = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = data_source_1.AppDataSource.getRepository(Credential_1.Credential);
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const credential = repo.create({ username, password: hashedPassword });
    yield repo.save(credential);
    return credential;
});
exports.createCredential = createCredential;
const validateCredential = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = data_source_1.AppDataSource.getRepository(Credential_1.Credential);
    const credential = yield repo.findOneBy({ username });
    if (!credential)
        return null;
    const isMatch = yield bcrypt_1.default.compare(password, credential.password);
    if (!isMatch)
        return null;
    return credential.id;
});
exports.validateCredential = validateCredential;
