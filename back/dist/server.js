"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use("/", router_1.default);
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("📡 Base de datos conectada");
    app.listen(envs_1.PORT, () => {
        console.log(`🚀 Servidor escuchando en puerto ${envs_1.PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Error al conectar a la base de datos", error);
});
exports.default = app;
