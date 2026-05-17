import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "@/lib/env";
import type { JwtAccessPayload, JwtRefreshPayload } from "@/types/auth";
import { UnauthorizedError } from "@/utils/errors";

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 10);
}

export async function verifyPassword(
	password: string,
	hash: string,
): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

export function signAccessToken(
	payload: Omit<JwtAccessPayload, "type">,
): string {
	const options: SignOptions = {
		expiresIn: env.jwt.accessExpiresIn as SignOptions["expiresIn"],
	};
	return jwt.sign(
		{ ...payload, type: "access" } satisfies JwtAccessPayload,
		env.jwt.accessSecret,
		options,
	);
}

export function signRefreshToken(
	payload: Omit<JwtRefreshPayload, "type">,
): string {
	const options: SignOptions = {
		expiresIn: env.jwt.refreshExpiresIn as SignOptions["expiresIn"],
	};
	return jwt.sign(
		{ ...payload, type: "refresh" } satisfies JwtRefreshPayload,
		env.jwt.refreshSecret,
		options,
	);
}

export function verifyAccessToken(token: string): JwtAccessPayload {
	try {
		const decoded = jwt.verify(token, env.jwt.accessSecret);
		if (
			typeof decoded !== "object" ||
			decoded === null ||
			(decoded as { type?: string }).type !== "access"
		) {
			throw new UnauthorizedError("Invalid token");
		}
		return decoded as unknown as JwtAccessPayload;
	} catch {
		throw new UnauthorizedError("Invalid or expired token");
	}
}

export function verifyRefreshToken(token: string): JwtRefreshPayload {
	try {
		const decoded = jwt.verify(token, env.jwt.refreshSecret);
		if (
			typeof decoded !== "object" ||
			decoded === null ||
			(decoded as { type?: string }).type !== "refresh"
		) {
			throw new UnauthorizedError("Invalid refresh token");
		}
		return decoded as unknown as JwtRefreshPayload;
	} catch {
		throw new UnauthorizedError("Invalid or expired refresh token");
	}
}
