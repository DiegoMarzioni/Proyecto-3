import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";

export const checkUniqueUserFields = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, nDni, credential } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  const credentialRepo = AppDataSource.getRepository(Credential);

  if (email) {
    const existingEmail = await userRepo.findOneBy({ email });
    if (existingEmail) {
      res.status(400).json({ message: "El email ya está registrado" });
      return;
    }
  }

  if (nDni) {
    const existingDni = await userRepo.findOneBy({ nDni });
    if (existingDni) {
      res.status(400).json({ message: "El nDni ya está registrado" });
      return;
    }
  }

  if (credential && credential.username) {
    const existingUsername = await credentialRepo.findOneBy({
      username: credential.username,
    });
    if (existingUsername) {
      res.status(400).json({ message: "El username ya está registrado" });
      return;
    }
  }

  next();
};
