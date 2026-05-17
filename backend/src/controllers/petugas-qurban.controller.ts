import type { Request, Response } from "express";
import { petugasQurbanService } from "@/services/petugas-qurban.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const petugasQurbanController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await petugasQurbanService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
			tahunHijriah:
				typeof req.query.tahun_hijriah === "string"
					? req.query.tahun_hijriah
					: undefined,
			status:
				typeof req.query.status === "string" ? req.query.status : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await petugasQurbanService.findById(req.params.id);
		if (!item) throw new NotFoundError("Petugas qurban not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await petugasQurbanService.create(req.body);
		return created(res, item, "Petugas qurban created");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await petugasQurbanService.update(req.params.id, req.body);
		return success(res, item, "Petugas qurban updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await petugasQurbanService.delete(req.params.id);
		return noContent(res, "Petugas qurban deleted");
	}),
};
