import { Router } from "express";
import {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    uploadProfilePicture,
    deleteProfilePicture,
} from "../controllers/usersController"
import { checkUniqueUserFields } from "../middlewares/uniqueUserFields";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/register", checkUniqueUserFields, registerUser);
router.post("/login", loginUser);
router.post("/:id/profile-picture", ...uploadProfilePicture);
router.delete("/:id/profile-picture", deleteProfilePicture);

export default router;