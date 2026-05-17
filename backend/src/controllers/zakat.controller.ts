import type { Request, Response } from "express";
import { zakatService } from "@/services/zakat.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const zakatController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await zakatService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
			jenisZakat:
				typeof req.query.jenis_zakat === "string"
					? req.query.jenis_zakat
					: undefined,
			from: req.query.from ? new Date(String(req.query.from)) : undefined,
			to: req.query.to ? new Date(String(req.query.to)) : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await zakatService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Zakat not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await zakatService.create(req.body);
		return created(res, item, "Zakat recorded");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await zakatService.update(Number(req.params.id), req.body);
		return success(res, item, "Zakat updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await zakatService.delete(Number(req.params.id));
		return noContent(res, "Zakat deleted");
	}),

	summary: asyncHandler(async (_req: Request, res: Response) => {
		const data = await zakatService.summary();
		return success(res, data);
	}),
};
