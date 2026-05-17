import { z } from "zod";

export const tabunganCreateSchema = z.object({
	nasabahId: z.string().min(1),
	hargaHewanId: z.string().min(1),
	jumlahSetoran: z.coerce.number().min(0),
	tanggalSetor: z.coerce.date().optional(),
	keterangan: z.string().nullish(),
	metodePembayaran: z.string().nullish(),
	status: z.string().optional(),
});

export const tabunganUpdateSchema = tabunganCreateSchema.partial();

export type TabunganCreateInput = z.infer<typeof tabunganCreateSchema>;
export type TabunganUpdateInput = z.infer<typeof tabunganUpdateSchema>;
