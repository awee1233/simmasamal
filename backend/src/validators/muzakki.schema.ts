import { z } from "zod";

export const muzakkiCreateSchema = z.object({
	namaMuzakki: z.string().min(1).max(80),
	telpMuzakki: z.string().min(1).max(20),
	alamatMuzakki: z.string().min(1),
	tanggalInput: z.coerce.date().optional(),
});

export const muzakkiUpdateSchema = muzakkiCreateSchema.partial();

export type MuzakkiCreateInput = z.infer<typeof muzakkiCreateSchema>;
export type MuzakkiUpdateInput = z.infer<typeof muzakkiUpdateSchema>;
