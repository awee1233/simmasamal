import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nextSequentialId } from "@/utils/id-generator";
import type {
	MuzakkiCreateInput,
	MuzakkiUpdateInput,
} from "@/validators/muzakki.schema";

export const muzakkiService = {
	async list(params: { page: number; limit: number; search?: string }) {
		const where: Prisma.MuzakkiWhereInput = params.search
			? {
					OR: [
						{ namaMuzakki: { contains: params.search, mode: "insensitive" } },
						{ noMuzakki: { contains: params.search, mode: "insensitive" } },
						{ telpMuzakki: { contains: params.search } },
					],
				}
			: {};
		const [total, items] = await Promise.all([
			prisma.muzakki.count({ where }),
			prisma.muzakki.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.muzakki.findUnique({ where: { id } });
	},

	async create(input: MuzakkiCreateInput) {
		const noMuzakki = await nextSequentialId({
			table: "muzakki",
			column: "noMuzakki",
			prefix: "MZ",
			width: 3,
		});
		return prisma.muzakki.create({
			data: {
				noMuzakki,
				namaMuzakki: input.namaMuzakki,
				telpMuzakki: input.telpMuzakki,
				alamatMuzakki: input.alamatMuzakki,
				tanggalInput: input.tanggalInput ?? new Date(),
			},
		});
	},

	async update(id: number, input: MuzakkiUpdateInput) {
		return prisma.muzakki.update({
			where: { id },
			data: {
				namaMuzakki: input.namaMuzakki,
				telpMuzakki: input.telpMuzakki,
				alamatMuzakki: input.alamatMuzakki,
				tanggalInput: input.tanggalInput,
			},
		});
	},

	async delete(id: number) {
		await prisma.muzakki.delete({ where: { id } });
	},
};
