import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nextDateSequentialId } from "@/utils/id-generator";
import type {
	InfaqCreateInput,
	InfaqUpdateInput,
} from "@/validators/infaq.schema";

function nowHhmmss(date = new Date()): string {
	const hh = String(date.getHours()).padStart(2, "0");
	const mm = String(date.getMinutes()).padStart(2, "0");
	const ss = String(date.getSeconds()).padStart(2, "0");
	return `${hh}:${mm}:${ss}`;
}

export const infaqService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		status?: string;
		from?: Date;
		to?: Date;
	}) {
		const where: Prisma.InfaqWhereInput = {
			AND: [
				params.search
					? {
							OR: [
								{
									noPenerimaan: {
										contains: params.search,
										mode: "insensitive",
									},
								},
								{
									jenisPenerimaan: {
										contains: params.search,
										mode: "insensitive",
									},
								},
							],
						}
					: {},
				params.status ? { status: params.status } : {},
				params.from ? { tanggal: { gte: params.from } } : {},
				params.to ? { tanggal: { lte: params.to } } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.infaq.count({ where }),
			prisma.infaq.findMany({
				where,
				include: { donatur: true, petugas: true },
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.infaq.findUnique({
			where: { id },
			include: { donatur: true, petugas: true },
		});
	},

	/**
	 * Create infaq. When isOnline is true, status defaults to "pending" (Req 7.3).
	 * For manual entry via admin, status defaults to "success" (Req 7.2).
	 */
	async create(
		input: InfaqCreateInput & { isOnline?: boolean; petugasId?: number | null },
	) {
		const tanggal = input.tanggal ?? new Date();
		const noPenerimaan = await nextDateSequentialId({
			table: "infaq",
			column: "noPenerimaan",
			prefix: "INF",
			width: 3,
			date: tanggal,
		});
		const status = input.isOnline ? "pending" : (input.status ?? "success");
		return prisma.infaq.create({
			data: {
				noPenerimaan,
				tanggal,
				waktu: input.waktu ?? nowHhmmss(),
				petugasId: input.petugasId ?? null,
				donaturId: input.donaturId,
				jenisPenerimaan: input.jenisPenerimaan,
				jumlah: input.jumlah,
				status,
			},
			include: { donatur: true },
		});
	},

	async update(id: number, input: InfaqUpdateInput) {
		return prisma.infaq.update({
			where: { id },
			data: input,
			include: { donatur: true },
		});
	},

	async delete(id: number) {
		await prisma.infaq.delete({ where: { id } });
	},

	/**
	 * Available balance = total successful infaq - total pengeluaran.
	 */
	async summary() {
		const [{ _sum: infaqSum }, { _sum: expenseSum }] = await Promise.all([
			prisma.infaq.aggregate({
				where: { status: "success" },
				_sum: { jumlah: true },
			}),
			prisma.pengeluaran.aggregate({ _sum: { jumlah: true } }),
		]);
		const totalInfaq = Number(infaqSum.jumlah ?? 0);
		const totalPengeluaran = Number(expenseSum.jumlah ?? 0);
		const saldo = totalInfaq - totalPengeluaran;
		return { totalInfaq, totalPengeluaran, saldo };
	},
};
