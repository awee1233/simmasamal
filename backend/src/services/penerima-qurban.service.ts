import type { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import type {
	PenerimaQurbanCreateInput,
	PenerimaQurbanUpdateInput,
} from "@/validators/penerima-qurban.schema";

export const penerimaQurbanService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		kategori?: string;
		tahunHijriah?: string;
	}) {
		const where: Prisma.PenerimaQurbanWhereInput = {
			AND: [
				params.search
					? {
							OR: [
								{ nama: { contains: params.search, mode: "insensitive" } },
								{ nik: { contains: params.search } },
							],
						}
					: {},
				params.kategori ? { kategori: params.kategori } : {},
				params.tahunHijriah ? { tahunHijriah: params.tahunHijriah } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.penerimaQurban.count({ where }),
			prisma.penerimaQurban.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: string) {
		return prisma.penerimaQurban.findUnique({ where: { id } });
	},

	async create(input: PenerimaQurbanCreateInput) {
		return prisma.penerimaQurban.create({
			data: {
				id: uuidv4(),
				nik: input.nik,
				nama: input.nama,
				tahunHijriah: input.tahunHijriah,
				status: input.status,
				alamat: input.alamat,
				rt: input.rt,
				rw: input.rw,
				kategori: input.kategori ?? null,
			},
		});
	},

	async update(id: string, input: PenerimaQurbanUpdateInput) {
		return prisma.penerimaQurban.update({ where: { id }, data: input });
	},

	async delete(id: string) {
		await prisma.penerimaQurban.delete({ where: { id } });
	},
};
