import { z } from "zod";

export const infaqCreateSchema = z.object({
	tanggal: z.coerce.date().optional(),
	waktu: z.string().max(20).optional(),
	donaturId: z.coerce.number().int().positive(),
	jenisPenerimaan: z.string().min(1).max(60),
	jumlah: z.coerce.number().min(0),
	status: z
		.enum(["pending", "success", "denied", "expired", "canceled"])
		.optional(),
});

export const infaqUpdateSchema = infaqCreateSchema.partial();

export type InfaqCreateInput = z.infer<typeof infaqCreateSchema>;
export type InfaqUpdateInput = z.infer<typeof infaqUpdateSchema>;
