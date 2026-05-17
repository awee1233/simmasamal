import { z } from "zod";

export const keuanganQurbanCreateSchema = z.object({
	tanggal: z.coerce.date().optional(),
	jenis: z.enum(["Masuk", "Keluar", "Beli Hewan Qurban"]),
	jumlah: z.coerce.number().min(0),
	keterangan: z.string().nullish(),
	tabunganQurbanId: z.string().nullish(),
	hargaHewanQurbanId: z.string().nullish(),
});

export const keuanganQurbanUpdateSchema = keuanganQurbanCreateSchema.partial();

export type KeuanganQurbanCreateInput = z.infer<
	typeof keuanganQurbanCreateSchema
>;
export type KeuanganQurbanUpdateInput = z.infer<
	typeof keuanganQurbanUpdateSchema
>;
