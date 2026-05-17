import { z } from "zod";

export const sholatCreateSchema = z.object({
	namaSholat: z.string().min(1),
	waktuSholat: z.string().min(1).max(10),
	waktuIqomah: z.string().min(1).max(10),
});

export const sholatUpdateSchema = sholatCreateSchema.partial();

export type SholatCreateInput = z.infer<typeof sholatCreateSchema>;
export type SholatUpdateInput = z.infer<typeof sholatUpdateSchema>;
