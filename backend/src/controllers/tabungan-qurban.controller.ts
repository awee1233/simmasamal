import type { Request, Response } from "express";
import { tabunganQurbanService } from "@/services/tabungan-qurban.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const tabunganQurbanController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await tabunganQurbanService.list({
			page: pagination.page,
			limit: pagination.limit,
			nasabahId:
				typeof req.query.nasabah_id === "string"
					? req.query.nasabah_id
					: undefined,
			status:
				typeof req.query.status === "string" ? req.query.status : undefined,
			from: req.query.from ? new Date(String(req.query.from)) : undefined,
			to: req.query.to ? new Date(String(req.query.to)) : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await tabunganQurbanService.findById(req.params.id);
		if (!item) throw new NotFoundError("Tabungan qurban not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const isOnline = !req.auth;
		const item = await tabunganQurbanService.create({ ...req.body, isOnline });
		return created(res, item, "Tabungan qurban recorded");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await tabunganQurbanService.update(req.params.id, req.body);
		return success(res, item, "Tabungan qurban updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await tabunganQurbanService.delete(req.params.id);
		return noContent(res, "Tabungan qurban deleted");
	}),
};
