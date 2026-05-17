import type { Request, Response } from "express";
import { penerimaQurbanService } from "@/services/penerima-qurban.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const penerimaQurbanController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await penerimaQurbanService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
			kategori:
				typeof req.query.kategori === "string" ? req.query.kategori : undefined,
			tahunHijriah:
				typeof req.query.tahun_hijriah === "string"
					? req.query.tahun_hijriah
					: undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await penerimaQurbanService.findById(req.params.id);
		if (!item) throw new NotFoundError("Penerima qurban not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await penerimaQurbanService.create(req.body);
		return created(res, item, "Penerima qurban created");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await penerimaQurbanService.update(req.params.id, req.body);
		return success(res, item, "Penerima qurban updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await penerimaQurbanService.delete(req.params.id);
		return noContent(res, "Penerima qurban deleted");
	}),
};
