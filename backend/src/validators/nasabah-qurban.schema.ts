import { z } from "zod";

export const nasabahCreateSchema = z.object({
	nik: z.string().min(1).max(20),
	nama: z.string().min(1),
	hp: z.string().min(1).max(25),
	alamat: z.string().min(1),
	refId: z.string().max(12).optional(),
	targetHewanId: z.string().nullish(),
});

export const nasabahUpdateSchema = nasabahCreateSchema.partial();

export type NasabahCreateInput = z.infer<typeof nasabahCreateSchema>;
export type NasabahUpdateInput = z.infer<typeof nasabahUpdateSchema>;
