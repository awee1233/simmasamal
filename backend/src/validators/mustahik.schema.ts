import { z } from "zod";

export const mustahikCreateSchema = z.object({
	noKk: z.string().min(1).max(20),
	namaMustahik: z.string().min(1).max(80),
	alamatMustahik: z.string().min(1),
	asnaf: z.string().min(1).max(40),
	rt: z.string().min(1).max(4),
	jumlahAnak: z.coerce.number().int().min(0).default(0),
	tanggalInput: z.coerce.date().optional(),
});

export const mustahikUpdateSchema = mustahikCreateSchema.partial();

export type MustahikCreateInput = z.infer<typeof mustahikCreateSchema>;
export type MustahikUpdateInput = z.infer<typeof mustahikUpdateSchema>;
