import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User"
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";
import { DB_HOST, DB_LOG, DB_NAME, DB_PASS, DB_PORT, DB_SYNC, DB_USER } from "./envs";

export const AppDataSource = new DataSource ({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: DB_SYNC,
    logging: DB_LOG,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
});

export const UserModel = AppDataSource.getRepository(User)
export const CredentialModel = AppDataSource.getRepository(Credential)

