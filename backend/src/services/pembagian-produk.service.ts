import { prisma } from "@/lib/prisma";
import type {
	PembagianProdukCreateInput,
	PembagianProdukUpdateInput,
} from "@/validators/pembagian-produk.schema";

function computePerproduk(berat: number, totalBungkus: number): number {
	if (!totalBungkus || totalBungkus <= 0) return 0;
	return berat / totalBungkus;
}

export const pembagianProdukService = {
	async list(params: { page: number; limit: number }) {
		const [total, items] = await Promise.all([
			prisma.pembagianProduk.count(),
			prisma.pembagianProduk.findMany({
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.pembagianProduk.findUnique({ where: { id } });
	},

	async create(input: PembagianProdukCreateInput) {
		return prisma.pembagianProduk.create({
			data: {
				produk: input.produk,
				berat: input.berat,
				totalBungkus: input.totalBungkus,
				beratPerproduk: computePerproduk(input.berat, input.totalBungkus),
			},
		});
	},

	async update(id: number, input: PembagianProdukUpdateInput) {
		const current = await prisma.pembagianProduk.findUnique({ where: { id } });
		if (!current) throw new Error("Pembagian produk not found");
		const berat = input.berat ?? Number(current.berat);
		const totalBungkus = input.totalBungkus ?? current.totalBungkus;
		return prisma.pembagianProduk.update({
			where: { id },
			data: {
				produk: input.produk,
				berat: input.berat,
				totalBungkus: input.totalBungkus,
				beratPerproduk: computePerproduk(berat, totalBungkus),
			},
		});
	},

	async delete(id: number) {
		await prisma.pembagianProduk.delete({ where: { id } });
	},
};
