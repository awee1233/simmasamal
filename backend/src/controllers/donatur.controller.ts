import type { Request, Response } from "express";
import { donaturService } from "@/services/donatur.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const donaturController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await donaturService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await donaturService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Donatur not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await donaturService.createOrUpdate(req.body);
		return created(res, item, "Donatur recorded");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await donaturService.update(Number(req.params.id), req.body);
		return success(res, item, "Donatur updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await donaturService.delete(Number(req.params.id));
		return noContent(res, "Donatur deleted");
	}),
};
