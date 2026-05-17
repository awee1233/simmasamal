import type { Request, Response } from "express";
import { hargaHewanService } from "@/services/harga-hewan.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const hargaHewanController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const tahunHijriah =
			typeof req.query.tahun_hijriah === "string"
				? req.query.tahun_hijriah
				: undefined;
		const { total, items } = await hargaHewanService.list({
			page: pagination.page,
			limit: pagination.limit,
			tahunHijriah,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await hargaHewanService.findById(req.params.id);
		if (!item) throw new NotFoundError("Harga hewan not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await hargaHewanService.create(req.body);
		return created(res, item, "Harga hewan created");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await hargaHewanService.update(req.params.id, req.body);
		return success(res, item, "Harga hewan updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await hargaHewanService.delete(req.params.id);
		return noContent(res, "Harga hewan deleted");
	}),
};
