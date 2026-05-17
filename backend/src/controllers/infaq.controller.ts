import type { Request, Response } from "express";
import { infaqService } from "@/services/infaq.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

export const infaqController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await infaqService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
			status:
				typeof req.query.status === "string" ? req.query.status : undefined,
			from: req.query.from ? new Date(String(req.query.from)) : undefined,
			to: req.query.to ? new Date(String(req.query.to)) : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),

	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await infaqService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Infaq not found");
		return success(res, item);
	}),

	create: asyncHandler(async (req: Request, res: Response) => {
		// When req.auth is present -> manual entry (status success unless overridden)
		// When not authenticated -> online donation (status pending)
		const isOnline = !req.auth;
		const petugasId = req.auth?.sub ?? null;
		const item = await infaqService.create({
			...req.body,
			isOnline,
			petugasId,
		});
		return created(res, item, "Infaq recorded");
	}),

	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await infaqService.update(Number(req.params.id), req.body);
		return success(res, item, "Infaq updated");
	}),

	remove: asyncHandler(async (req: Request, res: Response) => {
		await infaqService.delete(Number(req.params.id));
		return noContent(res, "Infaq deleted");
	}),

	summary: asyncHandler(async (_req: Request, res: Response) => {
		const data = await infaqService.summary();
		return success(res, data);
	}),
};
