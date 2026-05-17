import { z } from "zod";

export const idParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const stringIdParamSchema = z.object({
	id: z.string().min(1),
});

export const listQuerySchema = z.object({
	page: z.coerce.number().int().positive().optional(),
	limit: z.coerce.number().int().positive().max(200).optional(),
	search: z.string().trim().optional(),
});
