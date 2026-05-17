import type { Request, Response } from "express";
import { pengeluaranService } from "@/services/pengeluaran.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError, UnauthorizedError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const pengeluaranController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await pengeluaranService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
			jenisPengeluaran:
				typeof req.query.jenis_pengeluaran === "string"
					? req.query.jenis_pengeluaran
					: undefined,
			from: req.query.from ? new Date(String(req.query.from)) : undefined,
			to: req.query.to ? new Date(String(req.query.to)) : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await pengeluaranService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Pengeluaran not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		if (!req.auth) throw new UnauthorizedError();
		const item = await pengeluaranService.create({
			...req.body,
			userId: req.auth.sub,
		});
		return created(res, item, "Pengeluaran recorded");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await pengeluaranService.update(
			Number(req.params.id),
			req.body,
		);
		return success(res, item, "Pengeluaran updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await pengeluaranService.delete(Number(req.params.id));
		return noContent(res, "Pengeluaran deleted");
	}),
};
