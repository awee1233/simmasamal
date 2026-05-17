import { z } from "zod";

export const pembagianProdukCreateSchema = z.object({
	produk: z.string().min(1),
	berat: z.coerce.number().min(0),
	totalBungkus: z.coerce.number().int().min(1),
});

export const pembagianProdukUpdateSchema =
	pembagianProdukCreateSchema.partial();

export type PembagianProdukCreateInput = z.infer<
	typeof pembagianProdukCreateSchema
>;
export type PembagianProdukUpdateInput = z.infer<
	typeof pembagianProdukUpdateSchema
>;
