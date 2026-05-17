import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "@/lib/env";
import { fail, validationError } from "@/utils/api-response";
import { AppError, ValidationAppError } from "@/utils/errors";

export function notFoundHandler(req: Request, res: Response): void {
	fail(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

export function errorHandler(
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void {
	if (env.nodeEnv === "development") {
		// eslint-disable-next-line no-console
		console.error("[error]", err);
	}

	if (err instanceof ValidationAppError) {
		validationError(res, err.errors, err.message);
		return;
	}

	if (err instanceof AppError) {
		fail(res, err.message, err.statusCode, err.details ?? null);
		return;
	}

	if (err instanceof ZodError) {
		const grouped: Record<string, string[]> = {};
		for (const issue of err.errors) {
			const key = issue.path.join(".") || "_";
			if (!grouped[key]) grouped[key] = [];
			grouped[key].push(issue.message);
		}
		validationError(res, grouped);
		return;
	}

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === "P2002") {
			fail(res, "Resource with these unique fields already exists", 409, {
				target: err.meta?.target ?? null,
			});
			return;
		}
		if (err.code === "P2025") {
			fail(res, "Resource not found", 404);
			return;
		}
		fail(res, `Database error (${err.code})`, 400);
		return;
	}

	if (err instanceof Error) {
		fail(
			res,
			env.nodeEnv === "development" ? err.message : "Internal server error",
			500,
		);
		return;
	}

	fail(res, "Internal server error", 500);
}
