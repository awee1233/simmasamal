import type { Jabatan } from "@prisma/client";

export interface JwtAccessPayload {
	sub: number; // user id
	email: string;
	jabatan: Jabatan;
	type: "access";
}

export interface JwtRefreshPayload {
	sub: number;
	type: "refresh";
}

declare global {
	namespace Express {
		interface Request {
			auth?: JwtAccessPayload;
		}
	}
}

export {};
