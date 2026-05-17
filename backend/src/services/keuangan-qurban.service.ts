import type { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { nextDateSequentialId } from "@/utils/id-generator";
import type {
	KeuanganQurbanCreateInput,
	KeuanganQurbanUpdateInput,
} from "@/validators/keuangan-qurban.schema";

const MASUK = "Masuk";

export const keuanganQurbanService = {
	async list(params: {
		page: number;
		limit: number;
		jenis?: string;
		from?: Date;
		to?: Date;
	}) {
		const where: Prisma.KeuanganQurbanWhereInput = {
			AND: [
				params.jenis ? { jenis: params.jenis } : {},
				params.from ? { tanggal: { gte: params.from } } : {},
				params.to ? { tanggal: { lte: params.to } } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.keuanganQurban.count({ where }),
			prisma.keuanganQurban.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: string) {
		return prisma.keuanganQurban.findUnique({ where: { id } });
	},

	async create(input: KeuanganQurbanCreateInput) {
		const tanggal = input.tanggal ?? new Date();
		const noTransaksi = await nextDateSequentialId({
			table: "keuanganQurban",
			column: "noTransaksi",
			prefix: "KQ",
			width: 3,
			date: tanggal,
		});
		return prisma.keuanganQurban.create({
			data: {
				id: uuidv4(),
				noTransaksi,
				tanggal,
				jenis: input.jenis,
				jumlah: input.jumlah,
				keterangan: input.keterangan ?? null,
				tabunganQurbanId: input.tabunganQurbanId ?? null,
				hargaHewanQurbanId: input.hargaHewanQurbanId ?? null,
			},
		});
	},

	async update(id: string, input: KeuanganQurbanUpdateInput) {
		return prisma.keuanganQurban.update({ where: { id }, data: input });
	},

	async delete(id: string) {
		await prisma.keuanganQurban.delete({ where: { id } });
	},

	async summary(params: { from?: Date; to?: Date } = {}) {
		const where: Prisma.KeuanganQurbanWhereInput = {
			AND: [
				params.from ? { tanggal: { gte: params.from } } : {},
				params.to ? { tanggal: { lte: params.to } } : {},
			],
		};
		const grouped = await prisma.keuanganQurban.groupBy({
			by: ["jenis"],
			where,
			_sum: { jumlah: true },
		});
		let pemasukan = 0;
		let pengeluaran = 0;
		for (const g of grouped) {
			const total = Number(g._sum.jumlah ?? 0);
			if (g.jenis === MASUK) pemasukan += total;
			else pengeluaran += total;
		}
		return {
			pemasukan,
			pengeluaran,
			saldo: pemasukan - pengeluaran,
			byJenis: grouped.map((g) => ({
				jenis: g.jenis,
				total: Number(g._sum.jumlah ?? 0),
			})),
		};
	},
};
