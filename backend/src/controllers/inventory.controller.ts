import { relative } from "node:path";
import type { Request, Response } from "express";
import { env } from "@/lib/env";
import { inventoryService } from "@/services/inventory.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

function mergeGambar<T extends Record<string, unknown>>(
	req: Request,
	body: T,
): T {
	if (req.file) {
		(body as Record<string, unknown>).gambar = relative(
			env.uploadDir,
			req.file.path,
		).replace(/\\/g, "/");
	}
	return body;
}

export const inventoryController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await inventoryService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
			kondisi:
				typeof req.query.kondisi === "string" ? req.query.kondisi : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),
	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await inventoryService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Inventory not found");
		return success(res, item);
	}),
	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await inventoryService.create(mergeGambar(req, req.body));
		return created(res, item, "Inventory created");
	}),
	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await inventoryService.update(
			Number(req.params.id),
			mergeGambar(req, req.body),
		);
		return success(res, item, "Inventory updated");
	}),
	remove: asyncHandler(async (req: Request, res: Response) => {
		await inventoryService.delete(Number(req.params.id));
		return noContent(res, "Inventory deleted");
	}),
};
