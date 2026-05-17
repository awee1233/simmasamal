import type { Request, Response } from "express";
import { nasabahQurbanService } from "@/services/nasabah-qurban.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const nasabahQurbanController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await nasabahQurbanService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await nasabahQurbanService.findById(req.params.id);
		if (!item) throw new NotFoundError("Nasabah qurban not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await nasabahQurbanService.create(req.body);
		return created(res, item, "Nasabah qurban created");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await nasabahQurbanService.update(req.params.id, req.body);
		return success(res, item, "Nasabah qurban updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await nasabahQurbanService.delete(req.params.id);
		return noContent(res, "Nasabah qurban deleted");
	}),
};
