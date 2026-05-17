import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
import type { Prisma } from "@prisma/client";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import type {
	InventoryCreateInput,
	InventoryUpdateInput,
} from "@/validators/inventory.schema";

async function removeIfExists(relativePath: string | null | undefined) {
	if (!relativePath) return;
	try {
		await unlink(resolve(env.uploadDir, relativePath));
	} catch {}
}

export const inventoryService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		kondisi?: string;
	}) {
		const where: Prisma.InventoryWhereInput = {
			AND: [
				params.search
					? { nama: { contains: params.search, mode: "insensitive" } }
					: {},
				params.kondisi ? { kondisi: params.kondisi } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.inventory.count({ where }),
			prisma.inventory.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.inventory.findUnique({ where: { id } });
	},

	async create(input: InventoryCreateInput) {
		return prisma.inventory.create({
			data: {
				nama: input.nama,
				kondisi: input.kondisi ?? "Baik",
				quantity: input.quantity ?? 0,
				jumlahBaik: input.jumlahBaik ?? 0,
				jumlahRusak: input.jumlahRusak ?? 0,
				jumlahHilang: input.jumlahHilang ?? 0,
				gambar: input.gambar ?? null,
			},
		});
	},

	async update(id: number, input: InventoryUpdateInput) {
		if (input.gambar) {
			const current = await prisma.inventory.findUnique({ where: { id } });
			if (current && current.gambar && current.gambar !== input.gambar) {
				await removeIfExists(current.gambar);
			}
		}
		return prisma.inventory.update({ where: { id }, data: input });
	},

	async delete(id: number) {
		const current = await prisma.inventory.findUnique({ where: { id } });
		await prisma.inventory.delete({ where: { id } });
		if (current) await removeIfExists(current.gambar);
	},
};
