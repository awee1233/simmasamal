import type { Request, Response } from "express";
import { mustahikService } from "@/services/mustahik.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const mustahikController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await mustahikService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
			asnaf: typeof req.query.asnaf === "string" ? req.query.asnaf : undefined,
			rt: typeof req.query.rt === "string" ? req.query.rt : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await mustahikService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Mustahik not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await mustahikService.create(req.body);
		return created(res, item, "Mustahik created");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await mustahikService.update(Number(req.params.id), req.body);
		return success(res, item, "Mustahik updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await mustahikService.delete(Number(req.params.id));
		return noContent(res, "Mustahik deleted");
	}),
};
