import { Router } from "express";
import usersRouter from "./users";
import appointmentsRouter from "./appointments";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/turns", appointmentsRouter);

export default router;