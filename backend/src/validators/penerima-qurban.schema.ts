import { z } from "zod";

export const penerimaQurbanCreateSchema = z.object({
	nik: z.string().min(1).max(20),
	nama: z.string().min(1),
	tahunHijriah: z.string().min(1).max(10),
	status: z.enum(["Personal", "Yayasan"]),
	alamat: z.string().min(1),
	rt: z.string().max(4),
	rw: z.string().max(4),
	kategori: z.string().nullish(),
});

export const penerimaQurbanUpdateSchema = penerimaQurbanCreateSchema.partial();

export type PenerimaQurbanCreateInput = z.infer<
	typeof penerimaQurbanCreateSchema
>;
export type PenerimaQurbanUpdateInput = z.infer<
	typeof penerimaQurbanUpdateSchema
>;
