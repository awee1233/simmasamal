import { z } from "zod";

export const pengeluaranCreateSchema = z.object({
	tanggal: z.coerce.date().optional(),
	namaKoordinator: z.string().min(1).max(120),
	koordinatorBidang: z.string().min(1).max(120),
	jenisPengeluaran: z.string().min(1).max(120),
	jumlah: z.coerce.number().min(0),
	keterangan: z.string().nullish(),
});

export const pengeluaranUpdateSchema = pengeluaranCreateSchema.partial();

export type PengeluaranCreateInput = z.infer<typeof pengeluaranCreateSchema>;
export type PengeluaranUpdateInput = z.infer<typeof pengeluaranUpdateSchema>;
