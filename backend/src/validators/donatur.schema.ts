import { z } from "zod";

export const donaturCreateSchema = z.object({
	nama: z.string().min(1).max(120),
	noTelepon: z.string().min(6).max(25),
	email: z.string().email().nullish(),
	pekerjaan: z.string().max(120).nullish(),
	alamat: z.string().nullish(),
	anonim: z.enum(["ya", "tidak"]).default("tidak"),
	pesanDoa: z.string().nullish(),
});

export const donaturUpdateSchema = donaturCreateSchema.partial();

export type DonaturCreateInput = z.infer<typeof donaturCreateSchema>;
export type DonaturUpdateInput = z.infer<typeof donaturUpdateSchema>;
