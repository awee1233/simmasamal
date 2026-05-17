import type { Request, Response } from "express";
import { penyaluranService } from "@/services/penyaluran.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const penyaluranController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await penyaluranService.list({
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
		const item = await penyaluranService.findByNo(req.params.id);
		if (!item) throw new NotFoundError("Penyaluran not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await penyaluranService.create(req.body);
		return created(res, item, "Penyaluran recorded");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await penyaluranService.update(req.params.id, req.body);
		return success(res, item, "Penyaluran updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await penyaluranService.delete(req.params.id);
		return noContent(res, "Penyaluran deleted");
	}),
};
