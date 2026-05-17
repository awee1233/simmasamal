import { z } from "zod";

export const kajianCreateSchema = z.object({
	judulKajian: z.string().min(1),
	deskripsiKajian: z.string().min(1),
	tanggalKajian: z.coerce.date(),
	namaUstad: z.string().nullish(),
	fotoKajian: z.string().nullish(),
	fotoUstad: z.string().nullish(),
});

export const kajianUpdateSchema = kajianCreateSchema.partial();

export type KajianCreateInput = z.infer<typeof kajianCreateSchema>;
export type KajianUpdateInput = z.infer<typeof kajianUpdateSchema>;
