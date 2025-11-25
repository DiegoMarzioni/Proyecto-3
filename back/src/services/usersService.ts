import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import bcrypt from "bcrypt";
import { parseDisplayDateToISO, isValidISODate } from "../utils/dateUtils";

export const getAllUsers = async () => {
  return await AppDataSource.getRepository(User).find({
    relations: ["credential", "appointments"],
  });
};

export const getUserById = async (id: number) => {
  return await AppDataSource.getRepository(User).findOne({
    where: { id },
    relations: ["credential", "appointments"],
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  birthdate: string;
  nDni: string;
  credential: { username: string; password: string };
}) => {
  return await AppDataSource.transaction(async (manager) => {
    const credentialRepo = manager.getRepository(Credential);
    const userRepo = manager.getRepository(User);

    const hashedPassword = await bcrypt.hash(data.credential.password, 10);
    const credential = credentialRepo.create({
      username: data.credential.username,
      password: hashedPassword,
    });
    await credentialRepo.save(credential);

    let birthdateISO = data.birthdate;
    if (data.birthdate.includes('/')) {
      birthdateISO = parseDisplayDateToISO(data.birthdate);
    }

    if (!isValidISODate(birthdateISO)) {
      throw new Error('Formato de fecha de nacimiento inválido');
    }

    const user = userRepo.create({
      name: data.name,
      email: data.email,
      birthdate: birthdateISO,
      nDni: data.nDni,
      credential,
    });
    await userRepo.save(user);

    return user;
  });
};

export const getUserByCredentialId = async (credentialId: number) => {
  return await AppDataSource.getRepository(User).findOne({
    where: { credential: { id: credentialId } },
    relations: ["credential", "appointments"],
  });
};