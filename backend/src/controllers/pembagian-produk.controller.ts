import type { Request, Response } from "express";
import { pembagianProdukService } from "@/services/pembagian-produk.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const pembagianProdukController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await pembagianProdukService.list({
			page: pagination.page,
			limit: pagination.limit,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await pembagianProdukService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Pembagian produk not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await pembagianProdukService.create(req.body);
		return created(res, item, "Pembagian produk created");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await pembagianProdukService.update(
			Number(req.params.id),
			req.body,
		);
		return success(res, item, "Pembagian produk updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await pembagianProdukService.delete(Number(req.params.id));
		return noContent(res, "Pembagian produk deleted");
	}),
};
