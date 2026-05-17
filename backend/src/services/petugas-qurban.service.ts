import type { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import type {
	PetugasQurbanCreateInput,
	PetugasQurbanUpdateInput,
} from "@/validators/petugas-qurban.schema";

export const petugasQurbanService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		tahunHijriah?: string;
		status?: string;
	}) {
		const where: Prisma.PetugasQurbanWhereInput = {
			AND: [
				params.search
					? {
							OR: [
								{ nama: { contains: params.search, mode: "insensitive" } },
								{ nik: { contains: params.search } },
							],
						}
					: {},
				params.tahunHijriah ? { tahunHijriah: params.tahunHijriah } : {},
				params.status ? { status: params.status } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.petugasQurban.count({ where }),
			prisma.petugasQurban.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: string) {
		return prisma.petugasQurban.findUnique({ where: { id } });
	},

	async create(input: PetugasQurbanCreateInput) {
		return prisma.petugasQurban.create({
			data: { id: uuidv4(), ...input },
		});
	},

	async update(id: string, input: PetugasQurbanUpdateInput) {
		return prisma.petugasQurban.update({ where: { id }, data: input });
	},

	async delete(id: string) {
		await prisma.petugasQurban.delete({ where: { id } });
	},
};
