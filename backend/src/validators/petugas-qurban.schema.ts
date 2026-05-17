import { z } from "zod";

export const PETUGAS_QURBAN_STATUS = [
	"Petugas DKM",
	"Warga",
	"Penyembelih",
	"Lainnya",
] as const;

export const petugasQurbanCreateSchema = z.object({
	nik: z.string().min(1).max(20),
	nama: z.string().min(1).max(255),
	tahunHijriah: z.string().min(1).max(10),
	status: z.enum(PETUGAS_QURBAN_STATUS),
});

export const petugasQurbanUpdateSchema = petugasQurbanCreateSchema.partial();

export type PetugasQurbanCreateInput = z.infer<
	typeof petugasQurbanCreateSchema
>;
export type PetugasQurbanUpdateInput = z.infer<
	typeof petugasQurbanUpdateSchema
>;
