import { relative } from "node:path";
import type { Request, Response } from "express";
import { env } from "@/lib/env";
import { kajianService } from "@/services/kajian.service";
import { created, noContent, success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { NotFoundError } from "@/utils/errors";
import { buildMeta, parsePagination } from "@/utils/pagination";

function relativeUploadPath(filePath: string): string {
	return relative(env.uploadDir, filePath).replace(/\\/g, "/");
}

function mergeFileFields<T extends Record<string, unknown>>(
	req: Request,
	body: T,
): T {
	const files = req.files as
		| { [field: string]: Express.Multer.File[] }
		| undefined;
	if (files?.fotoKajian?.[0]) {
		(body as Record<string, unknown>).fotoKajian = relativeUploadPath(
			files.fotoKajian[0].path,
		);
	}
	if (files?.fotoUstad?.[0]) {
		(body as Record<string, unknown>).fotoUstad = relativeUploadPath(
			files.fotoUstad[0].path,
		);
	}
	return body;
}

export const kajianController = {
	list: asyncHandler(async (req: Request, res: Response) => {
		const pagination = parsePagination(req);
		const { total, items } = await kajianService.list({
			page: pagination.page,
			limit: pagination.limit,
			search:
				typeof req.query.search === "string" ? req.query.search : undefined,
		});
		return success(res, items, "OK", 200, buildMeta(pagination, total));
	}),
	get: asyncHandler(async (req: Request, res: Response) => {
		const item = await kajianService.findById(Number(req.params.id));
		if (!item) throw new NotFoundError("Kajian not found");
		return success(res, item);
	}),
	create: asyncHandler(async (req: Request, res: Response) => {
		const item = await kajianService.create(mergeFileFields(req, req.body));
		return created(res, item, "Kajian created");
	}),
	update: asyncHandler(async (req: Request, res: Response) => {
		const item = await kajianService.update(
			Number(req.params.id),
			mergeFileFields(req, req.body),
		);
		return success(res, item, "Kajian updated");
	}),
	remove: asyncHandler(async (req: Request, res: Response) => {
		await kajianService.delete(Number(req.params.id));
		return noContent(res, "Kajian deleted");
	}),
};
