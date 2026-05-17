import { prisma } from "@/lib/prisma";
import type {
	SholatCreateInput,
	SholatUpdateInput,
} from "@/validators/sholat.schema";

export const sholatService = {
	async list() {
		return prisma.sholat.findMany({ orderBy: { id: "asc" } });
	},

	async findById(id: number) {
		return prisma.sholat.findUnique({ where: { id } });
	},

	async create(input: SholatCreateInput) {
		return prisma.sholat.create({ data: input });
	},

	async update(id: number, input: SholatUpdateInput) {
		return prisma.sholat.update({ where: { id }, data: input });
	},

	async delete(id: number) {
		await prisma.sholat.delete({ where: { id } });
	},
};
