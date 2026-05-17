import type { Request, Response } from "express";
import { sholatService } from "@/services/sholat.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";

export const sholatController = {
	list: asyncHandler(async (_req: Request, res: Response) => {
		const items = await sholatService.list();
		return success(res, items);
	}),
	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await sholatService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Sholat not found");
		return success(res, item);
	}),
	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await sholatService.create(req.body);
		return created(res, item, "Sholat created");
	}),
	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await sholatService.update(Number(req.params.id), req.body);
		return success(res, item, "Sholat updated");
	}),
	remove: asyncHandler(async (req: Request, res: Response) => {
		await sholatService.delete(Number(req.params.id));
		return noContent(res, "Sholat deleted");
	}),
};
