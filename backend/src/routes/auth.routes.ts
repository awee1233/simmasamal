import { Jabatan } from "@prisma/client";
import { Router } from "express";
import { authController } from "@/controllers/auth.controller";
import { authRequired, requireRoles } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import {
	idParamSchema,
	loginSchema,
	refreshSchema,
	registerSchema,
	updateUserSchema,
} from "@/validators/auth.schema";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/refresh", validate(refreshSchema), authController.refresh);
authRouter.get("/me", authRequired, authController.me);

authRouter.post(
	"/register",
	authRequired,
	requireRoles(Jabatan.Administrator),
	validate(registerSchema),
	authController.register,
);

authRouter.get(
	"/users",
	authRequired,
	requireRoles(Jabatan.Administrator),
	authController.listUsers,
);

authRouter.put(
	"/users/:id",
	authRequired,
	requireRoles(Jabatan.Administrator),
	validate(idParamSchema, "params"),
	validate(updateUserSchema),
	authController.updateUser,
);

authRouter.delete(
	"/users/:id",
	authRequired,
	requireRoles(Jabatan.Administrator),
	validate(idParamSchema, "params"),
	authController.deleteUser,
);
