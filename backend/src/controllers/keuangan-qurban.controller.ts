import type { Request, Response } from "express";
import { keuanganQurbanService } from "@/services/keuangan-qurban.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const keuanganQurbanController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await keuanganQurbanService.list({
			page: pagination.page,
			limit: pagination.limit,
			jenis: typeof req.query.jenis === "string" ? req.query.jenis : undefined,
			from: req.query.from ? new Date(String(req.query.from)) : undefined,
			to: req.query.to ? new Date(String(req.query.to)) : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await keuanganQurbanService.findById(req.params.id);
		if (!item) throw new NotFoundError("Keuangan qurban not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await keuanganQurbanService.create(req.body);
		return created(res, item, "Keuangan qurban recorded");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await keuanganQurbanService.update(req.params.id, req.body);
		return success(res, item, "Keuangan qurban updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await keuanganQurbanService.delete(req.params.id);
		return noContent(res, "Keuangan qurban deleted");
	}),

	summary: asyncHandler(async (req: Request, res: Response) => {
		const data = await keuanganQurbanService.summary({
			from: req.query.from ? new Date(String(req.query.from)) : undefined,
			to: req.query.to ? new Date(String(req.query.to)) : undefined,
		});
		return success(res, data);
	}),
};
