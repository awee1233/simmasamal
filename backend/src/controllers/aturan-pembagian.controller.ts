import type { Request, Response } from "express";
import { aturanPembagianService } from "@/services/aturan-pembagian.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const aturanPembagianController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await aturanPembagianService.list({
			page: pagination.page,
			limit: pagination.limit,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await aturanPembagianService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Aturan pembagian not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await aturanPembagianService.create(req.body);
		return created(res, item, "Aturan pembagian created");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await aturanPembagianService.update(
			Number(req.params.id),
			req.body,
		);
		return success(res, item, "Aturan pembagian updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await aturanPembagianService.delete(Number(req.params.id));
		return noContent(res, "Aturan pembagian deleted");
	}),
};
