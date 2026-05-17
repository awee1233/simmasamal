import type { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import type {
	HargaHewanCreateInput,
	HargaHewanUpdateInput,
} from "@/validators/harga-hewan.schema";

export const hargaHewanService = {
	async list(params: { page: number; limit: number; tahunHijriah?: string }) {
		const where: Prisma.HargaHewanQurbanWhereInput = params.tahunHijriah
			? { tahunHijriah: params.tahunHijriah }
			: {};
		const [total, items] = await Promise.all([
			prisma.hargaHewanQurban.count({ where }),
			prisma.hargaHewanQurban.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: string) {
		return prisma.hargaHewanQurban.findUnique({ where: { id } });
	},

	async create(input: HargaHewanCreateInput) {
		return prisma.hargaHewanQurban.create({
			data: {
				id: uuidv4(),
				jenisHewan: input.jenisHewan,
				harga: input.harga,
				tahunHijriah: input.tahunHijriah,
				keterangan: input.keterangan ?? null,
			},
		});
	},

	async update(id: string, input: HargaHewanUpdateInput) {
		return prisma.hargaHewanQurban.update({
			where: { id },
			data: input,
		});
	},

	async delete(id: string) {
		await prisma.hargaHewanQurban.delete({ where: { id } });
	},
};
