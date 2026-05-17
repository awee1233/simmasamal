import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
import type { Prisma } from "@prisma/client";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import type {
	KajianCreateInput,
	KajianUpdateInput,
} from "@/validators/kajian.schema";

async function removeIfExists(relativePath: string | null | undefined) {
	if (!relativePath) return;
	try {
		await unlink(resolve(env.uploadDir, relativePath));
	} catch {
		// ignore missing files
	}
}

export const kajianService = {
	async list(params: { page: number; limit: number; search?: string }) {
		const where: Prisma.KajianWhereInput = params.search
			? {
					OR: [
						{ judulKajian: { contains: params.search, mode: "insensitive" } },
						{ namaUstad: { contains: params.search, mode: "insensitive" } },
					],
				}
			: {};
		const [total, items] = await Promise.all([
			prisma.kajian.count({ where }),
			prisma.kajian.findMany({
				where,
				orderBy: { tanggalKajian: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.kajian.findUnique({ where: { id } });
	},

	async create(input: KajianCreateInput) {
		return prisma.kajian.create({
			data: {
				judulKajian: input.judulKajian,
				deskripsiKajian: input.deskripsiKajian,
				tanggalKajian: input.tanggalKajian,
				fotoKajian: input.fotoKajian ?? null,
				fotoUstad: input.fotoUstad ?? null,
				namaUstad: input.namaUstad ?? null,
			},
		});
	},

	async update(id: number, input: KajianUpdateInput) {
		// Replace old images if new ones are provided
		if (input.fotoKajian || input.fotoUstad) {
			const current = await prisma.kajian.findUnique({ where: { id } });
			if (current) {
				if (input.fotoKajian && current.fotoKajian !== input.fotoKajian) {
					await removeIfExists(current.fotoKajian);
				}
				if (input.fotoUstad && current.fotoUstad !== input.fotoUstad) {
					await removeIfExists(current.fotoUstad);
				}
			}
		}
		return prisma.kajian.update({ where: { id }, data: input });
	},

	async delete(id: number) {
		const current = await prisma.kajian.findUnique({ where: { id } });
		await prisma.kajian.delete({ where: { id } });
		if (current) {
			await removeIfExists(current.fotoKajian);
			await removeIfExists(current.fotoUstad);
		}
	},
};
