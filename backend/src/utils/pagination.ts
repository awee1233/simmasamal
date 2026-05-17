import type { Request } from "express";
import type { ApiMeta } from "./api-response";

export interface PaginationParams {
	page: number;
	limit: number;
	skip: number;
	take: number;
}

export function parsePagination(req: Request): PaginationParams {
	const rawPage = Number.parseInt(String(req.query.page ?? "1"), 10);
	const rawLimit = Number.parseInt(String(req.query.limit ?? "15"), 10);
	const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
	const limit =
		Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 200) : 15;
	const skip = (page - 1) * limit;
	return { page, limit, skip, take: limit };
}

export function buildMeta(
	params: Pick<PaginationParams, "page" | "limit">,
	total: number,
): ApiMeta {
	const { page, limit } = params;
	const totalPages = limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1;
	return { page, limit, total, totalPages };
}
