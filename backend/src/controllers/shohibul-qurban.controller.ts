import type { Request, Response } from "express";
import { shohibulQurbanService } from "@/services/shohibul-qurban.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const shohibulQurbanController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await shohibulQurbanService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
			tahunHijriah:
				typeof req.query.tahun_hijriah === "string"
					? req.query.tahun_hijriah
					: undefined,
			jenisHewan:
				typeof req.query.jenis_hewan === "string"
					? req.query.jenis_hewan
					: undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await shohibulQurbanService.findById(req.params.id);
		if (!item) throw new NotFoundError("Shohibul qurban not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await shohibulQurbanService.create(req.body);
		return created(res, item, "Shohibul qurban recorded");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await shohibulQurbanService.update(req.params.id, req.body);
		return success(res, item, "Shohibul qurban updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await shohibulQurbanService.delete(req.params.id);
		return noContent(res, "Shohibul qurban deleted");
	}),
};
