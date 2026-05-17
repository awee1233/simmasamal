import type { Request, Response } from "express";
import { muzakkiService } from "@/services/muzakki.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const muzakkiController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const search =
			typeof req.query.search === "string" ? req.query.search : undefined;
		const { total, items } = await muzakkiService.list({
			page: pagination.page,
			limit: pagination.limit,
			search,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const item = await muzakkiService.findById(id);
		if (!item) throw new NotFoundError("Muzakki not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await muzakkiService.create(req.body);
		return created(res, item, "Muzakki created");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		const item = await muzakkiService.update(id, req.body);
		return success(res, item, "Muzakki updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		await muzakkiService.delete(id);
		return noContent(res, "Muzakki deleted");
	}),
};
