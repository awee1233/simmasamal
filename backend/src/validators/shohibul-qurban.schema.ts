import { z } from "zod";

const detailSchema = z.object({
	nama: z.string().min(1),
	binOrBinti: z.enum(["bin", "binti"]),
	binOrBintiValue: z.string().min(1),
});

export const shohibulQurbanCreateSchema = z.object({
	tahunHijriah: z.string().min(1).max(10),
	nik: z.string().min(1).max(20),
	nama: z.string().min(1),
	hp: z.string().min(1).max(25),
	alamat: z.string().min(1),
	jenisHewan: z.string().min(1).max(40),
	berat: z.string().max(20).default(""),
	bagianDiminta: z.string().min(1),
	tanggal: z.string().min(1).max(30),
	details: z.array(detailSchema).min(1),
});

export const shohibulQurbanUpdateSchema = shohibulQurbanCreateSchema
	.partial()
	.extend({ details: z.array(detailSchema).optional() });

export type ShohibulQurbanCreateInput = z.infer<
	typeof shohibulQurbanCreateSchema
>;
export type ShohibulQurbanUpdateInput = z.infer<
	typeof shohibulQurbanUpdateSchema
>;
