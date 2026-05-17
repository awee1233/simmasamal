import type { Jabatan } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "@/utils/errors";
import { verifyAccessToken } from "@/utils/jwt";

function extractToken(req: Request): string | null {
	const header = req.headers.authorization ?? "";
	if (header.startsWith("Bearer ")) {
		return header.slice(7).trim() || null;
	}
	return null;
}

/**
 * Required authentication: rejects the request if no valid token is provided.
 */
export function authRequired(
	req: Request,
	_res: Response,
	next: NextFunction,
): void {
	const token = extractToken(req);
	if (!token) {
		next(new UnauthorizedError("Authentication required"));
		return;
	}
	try {
		req.auth = verifyAccessToken(token);
		next();
	} catch (err) {
		next(err);
	}
}

/**
 * Optional authentication: attaches user if token is valid but does not block otherwise.
 * Useful for mixed public/private endpoints (e.g., POST /api/infaq for online donations).
 */
export function authOptional(
	req: Request,
	_res: Response,
	next: NextFunction,
): void {
	const token = extractToken(req);
	if (!token) {
		next();
		return;
	}
	try {
		req.auth = verifyAccessToken(token);
	} catch {
		// Ignore invalid tokens in optional auth
	}
	next();
}

/**
 * Role-based authorization. Call after authRequired.
 */
export function requireRoles(...allowed: Jabatan[]) {
	return (req: Request, _res: Response, next: NextFunction): void => {
		if (!req.auth) {
			next(new UnauthorizedError("Authentication required"));
			return;
		}
		if (!allowed.includes(req.auth.jabatan)) {
			next(new ForbiddenError("Insufficient permissions"));
			return;
		}
		next();
	};
}
