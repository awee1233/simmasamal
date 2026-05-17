import { z } from "zod";

export const aturanPembagianCreateSchema = z.object({
	status: z.string().min(1),
	produk: z.array(z.string().min(1)).min(1, "Pilih minimal satu produk"),
});

export const aturanPembagianUpdateSchema =
	aturanPembagianCreateSchema.partial();

export type AturanPembagianCreateInput = z.infer<
	typeof aturanPembagianCreateSchema
>;
export type AturanPembagianUpdateInput = z.infer<
	typeof aturanPembagianUpdateSchema
>;
