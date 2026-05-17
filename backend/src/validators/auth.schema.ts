import { Jabatan } from "@prisma/client";
import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export const registerSchema = z.object({
	name: z.string().min(1).max(100),
	email: z.string().email(),
	password: z.string().min(6).max(100),
	jabatan: z.nativeEnum(Jabatan),
});

export const updateUserSchema = z.object({
	name: z.string().min(1).max(100).optional(),
	email: z.string().email().optional(),
	password: z.string().min(6).max(100).optional(),
	jabatan: z.nativeEnum(Jabatan).optional(),
});

export const refreshSchema = z.object({
	refreshToken: z.string().min(10),
});

export const idParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});
