import { prisma } from "@/lib/prisma";
import type {
	AturanPembagianCreateInput,
	AturanPembagianUpdateInput,
} from "@/validators/aturan-pembagian.schema";

function joinProduk(produk: string[]): string {
	return produk.join(",");
}

function splitProduk(value: string): string[] {
	if (!value) return [];
	return value
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

function mapItem(row: {
	id: number;
	status: string;
	produk: string;
	createdAt: Date;
	updatedAt: Date;
}) {
	return {
		id: row.id,
		status: row.status,
		produk: splitProduk(row.produk),
		createdAt: row.createdAt,
		updatedAt: row.updatedAt,
	};
}

export const aturanPembagianService = {
	async list(params: { page: number; limit: number }) {
		const [total, rows] = await Promise.all([
			prisma.aturanPembagian.count(),
			prisma.aturanPembagian.findMany({
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items: rows.map(mapItem) };
	},

	async findById(id: number) {
		const row = await prisma.aturanPembagian.findUnique({ where: { id } });
		return row ? mapItem(row) : null;
	},

	async create(input: AturanPembagianCreateInput) {
		const row = await prisma.aturanPembagian.create({
			data: { status: input.status, produk: joinProduk(input.produk) },
		});
		return mapItem(row);
	},

	async update(id: number, input: AturanPembagianUpdateInput) {
		const row = await prisma.aturanPembagian.update({
			where: { id },
			data: {
				status: input.status,
				produk: input.produk ? joinProduk(input.produk) : undefined,
			},
		});
		return mapItem(row);
	},

	async delete(id: number) {
		await prisma.aturanPembagian.delete({ where: { id } });
	},
};
