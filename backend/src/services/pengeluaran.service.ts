import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nextSequentialId } from "@/utils/id-generator";
import type {
	PengeluaranCreateInput,
	PengeluaranUpdateInput,
} from "@/validators/pengeluaran.schema";

export const pengeluaranService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		jenisPengeluaran?: string;
		from?: Date;
		to?: Date;
	}) {
		const where: Prisma.PengeluaranWhereInput = {
			AND: [
				params.search
					? {
							OR: [
								{
									noPengajuan: {
										contains: params.search,
										mode: "insensitive",
									},
								},
								{
									namaKoordinator: {
										contains: params.search,
										mode: "insensitive",
									},
								},
							],
						}
					: {},
				params.jenisPengeluaran
					? { jenisPengeluaran: params.jenisPengeluaran }
					: {},
				params.from ? { tanggal: { gte: params.from } } : {},
				params.to ? { tanggal: { lte: params.to } } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.pengeluaran.count({ where }),
			prisma.pengeluaran.findMany({
				where,
				include: { user: { select: { id: true, name: true, email: true } } },
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.pengeluaran.findUnique({
			where: { id },
			include: { user: { select: { id: true, name: true, email: true } } },
		});
	},

	async create(input: PengeluaranCreateInput & { userId: number }) {
		const noPengajuan = await nextSequentialId({
			table: "pengeluaran",
			column: "noPengajuan",
			prefix: "PG",
			width: 3,
		});
		return prisma.pengeluaran.create({
			data: {
				noPengajuan,
				tanggal: input.tanggal ?? new Date(),
				namaKoordinator: input.namaKoordinator,
				koordinatorBidang: input.koordinatorBidang,
				jenisPengeluaran: input.jenisPengeluaran,
				jumlah: input.jumlah,
				keterangan: input.keterangan ?? null,
				userId: input.userId,
			},
		});
	},

	async update(id: number, input: PengeluaranUpdateInput) {
		return prisma.pengeluaran.update({
			where: { id },
			data: input,
		});
	},

	async delete(id: number) {
		await prisma.pengeluaran.delete({ where: { id } });
	},
};
