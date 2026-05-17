import type { Response } from "express";

export interface ApiMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface ApiResponse<T> {
	status: "success" | "error";
	message: string;
	data: T | null;
	meta?: ApiMeta;
}

export interface ValidationErrorResponse {
	status: "error";
	message: string;
	errors: Record<string, string[]>;
}

export function success<T>(
	res: Response,
	data: T,
	message = "OK",
	statusCode = 200,
	meta?: ApiMeta,
): Response {
	const body: ApiResponse<T> = {
		status: "success",
		message,
		data,
		...(meta ? { meta } : {}),
	};
	return res.status(statusCode).json(body);
}

export function created<T>(
	res: Response,
	data: T,
	message = "Created",
): Response {
	return success(res, data, message, 201);
}

export function noContent(res: Response, message = "Deleted"): Response {
	return success(res, null, message, 200);
}

export function fail(
	res: Response,
	message: string,
	statusCode = 400,
	data: unknown = null,
): Response {
	const body: ApiResponse<unknown> = {
		status: "error",
		message,
		data,
	};
	return res.status(statusCode).json(body);
}

export function validationError(
	res: Response,
	errors: Record<string, string[]>,
	message = "Validation failed",
): Response {
	const body: ValidationErrorResponse = { status: "error", message, errors };
	return res.status(422).json(body);
}
