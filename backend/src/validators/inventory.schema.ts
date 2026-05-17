import { z } from "zod";

export const inventoryCreateSchema = z.object({
	nama: z.string().min(1),
	kondisi: z.enum(["Baik", "Rusak", "Hilang"]).default("Baik"),
	quantity: z.coerce.number().int().min(0).default(0),
	jumlahBaik: z.coerce.number().int().min(0).default(0),
	jumlahRusak: z.coerce.number().int().min(0).default(0),
	jumlahHilang: z.coerce.number().int().min(0).default(0),
	gambar: z.string().nullish(),
});

export const inventoryUpdateSchema = inventoryCreateSchema.partial();

export type InventoryCreateInput = z.infer<typeof inventoryCreateSchema>;
export type InventoryUpdateInput = z.infer<typeof inventoryUpdateSchema>;
