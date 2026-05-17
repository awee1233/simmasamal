import type { Request, Response } from "express";
import { authService } from "@/services/auth.service";
import { created, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { UnauthorizedError } from "@/utils/errors";

export const authController = {
	login: asyncHandler(async (req: Request, res: Response) => {
		const { email, password } = req.body;
		const result = await authService.login(email, password);
		return success(res, result, "Login successful");
	}),

	register: asyncHandler(async (req: Request, res: Response) => {
		const user = await authService.register(req.body);
		return created(res, user, "User created");
	}),

	refresh: asyncHandler(async (req: Request, res: Response) => {
		const { refreshToken } = req.body;
		const result = await authService.refresh(refreshToken);
		return success(res, result, "Token refreshed");
	}),

	me: asyncHandler(async (req: Request, res: Response) => {
		if (!req.auth) throw new UnauthorizedError();
		const user = await authService.me(req.auth.sub);
		return success(res, user);
	}),

	listUsers: asyncHandler(async (_req: Request, res: Response) => {
		const users = await authService.listUsers();
		return success(res, users);
	}),

	updateUser: asyncHandler(async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const user = await authService.updateUser(id, req.body);
		return success(res, user, "User updated");
	}),

	deleteUser: asyncHandler(async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		await authService.deleteUser(id);
		return success(res, null, "User deleted");
	}),
};
