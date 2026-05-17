import { z } from "zod";

export const JENIS_ZAKAT = [
	"Zakat Fitrah",
	"Zakat Mal",
	"Zakat Fidyah",
] as const;
export const JENIS_BAYAR = ["uang", "beras"] as const;

export const zakatCreateSchema = z.object({
	tanggalZakat: z.coerce.date().optional(),
	jamZakat: z.string().min(1).max(20).optional(),
	petugasPenerima: z.string().min(1).max(80),
	noMuzakki: z.string().min(1).max(8),
	jenisZakat: z.enum(JENIS_ZAKAT),
	jumlahZakat: z.coerce.number().min(0),
	jenisBayar: z.enum(JENIS_BAYAR),
	status: z.string().optional(),
});

export const zakatUpdateSchema = zakatCreateSchema.partial();

export type ZakatCreateInput = z.infer<typeof zakatCreateSchema>;
export type ZakatUpdateInput = z.infer<typeof zakatUpdateSchema>;
