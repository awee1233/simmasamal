import { z } from "zod";

export const hargaHewanCreateSchema = z.object({
	jenisHewan: z.string().min(1),
	harga: z.coerce.number().min(0),
	tahunHijriah: z.string().min(1).max(10),
	keterangan: z.string().nullish(),
});

export const hargaHewanUpdateSchema = hargaHewanCreateSchema.partial();

export type HargaHewanCreateInput = z.infer<typeof hargaHewanCreateSchema>;
export type HargaHewanUpdateInput = z.infer<typeof hargaHewanUpdateSchema>;
