import { Request, Response } from "express";
import * as usersService from "../services/usersService";
import * as credentialsService from "../services/credentialsService";
import { validate } from "class-validator";
import { CreateUserDto } from "../dto/CreateUserDto";
import { CreateCredentialDto } from "../dto/CreateCredentialDto";
import { plainToInstance } from "class-transformer";
import multer from "multer";
import { uploadImage } from "../services/uploadImage";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import fs from "fs";


const upload = multer({ dest: "uploads/" });

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await usersService.getAllUsers();
  if (!users || users.length === 0) {
    res.status(404).json({ message: "No se encontraron usuarios" });
    return;
  }
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }
  const user = await usersService.getUserById(id);
  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado" });
    return;
  }
  res.status(200).json(user);
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const dto = plainToInstance(CreateUserDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    res.status(400).json({ message: "Datos inválidos", errors });
    return;
  }

  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  } catch (e: any) {
    res.status(400).json({ message: "Error al crear usuario", error: e.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ access: false, message: "Faltan datos" });
    return;
  }

  const credentialId = await credentialsService.validateCredential(username, password);
  if (!credentialId) {
    res.status(400).json({ access: false, message: "Credenciales incorrectas" });
    return;
  }

  const user = await usersService.getUserByCredentialId(credentialId);
  if (!user) {
    res.status(400).json({ access: false, message: "Usuario no encontrado" });
    return;
  }

  res.status(200).json({ access: true, user });
};

export const uploadProfilePicture = [
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.id);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "No se subió ninguna imagen" });
      return;
    }

    try {
      const result = await uploadImage(req.file.path);
      user.profilePicture = result.secure_url;
      await userRepo.save(user);
      fs.unlinkSync(req.file.path);
      res.status(200).json({ message: "Imagen subida", url: result.secure_url });
      return;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      res.status(500).json({ message: "Error al subir imagen", error: errorMsg });
      return;
    }
  },
];

export const deleteProfilePicture = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.id);
  
  if (isNaN(userId)) {
    res.status(400).json({ message: "ID de usuario inválido" });
    return;
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });
    
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    if (!user.profilePicture) {
      res.status(400).json({ message: "El usuario no tiene imagen de perfil" });
      return;
    }

    
    user.profilePicture = null;
    await userRepo.save(user);

    res.status(200).json({ 
      message: "Imagen de perfil eliminada correctamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ 
      message: "Error al eliminar imagen de perfil", 
      error: errorMsg 
    });
  }
};