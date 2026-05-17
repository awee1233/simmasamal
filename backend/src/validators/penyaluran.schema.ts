import { z } from "zod";

const penerimaSchema = z.object({
	mustahikId: z.coerce.number().int().positive(),
	jumlahTerima: z.coerce.number().min(0),
	jumlahTerimaUang: z.coerce.number().min(0).optional(),
	jumlahTerimaBeras: z.coerce.number().min(0).optional(),
	statusPenerima: z.string().max(30).optional(),
});

export const penyaluranCreateSchema = z.object({
	tanggalPenyaluran: z.coerce.date().optional(),
	jamPenyaluran: z.string().max(20).optional(),
	petugasPenyaluran: z.string().min(1).max(80),
	jenisZakat: z.string().min(1).max(30),
	totalPenyaluran: z.coerce.number().min(0),
	berasDisalurkan: z.coerce.number().min(0).optional(),
	statusPenyaluran: z.string().max(30).optional(),
	keterangan: z.string().nullish(),
	penerimas: z.array(penerimaSchema).min(1),
});

export const penyaluranUpdateSchema = penyaluranCreateSchema.partial().extend({
	penerimas: z.array(penerimaSchema).optional(),
});

export type PenyaluranCreateInput = z.infer<typeof penyaluranCreateSchema>;
export type PenyaluranUpdateInput = z.infer<typeof penyaluranUpdateSchema>;
