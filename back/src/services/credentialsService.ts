import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";
import bcrypt from "bcrypt";

export const createCredential = async (username: string, password: string) => {
  const repo = AppDataSource.getRepository(Credential);
  const hashedPassword = await bcrypt.hash(password, 10);
  const credential = repo.create({ username, password: hashedPassword });
  await repo.save(credential);
  return credential;
};

export const validateCredential = async (username: string, password: string) => {
  const repo = AppDataSource.getRepository(Credential);
  const credential = await repo.findOneBy({ username });
  if (!credential) return null;
  const isMatch = await bcrypt.compare(password, credential.password);
  if (!isMatch) return null;
  return credential.id;
};