import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import type {
	TabunganCreateInput,
	TabunganUpdateInput,
} from "@/validators/tabungan-qurban.schema";

async function recalcNasabahSaldo(
	tx: Prisma.TransactionClient,
	nasabahId: string,
): Promise<void> {
	const aggr = await tx.tabunganQurban.aggregate({
		where: { nasabahId, status: { in: ["success", "settlement", "capture"] } },
		_sum: { jumlahSetoran: true },
	});
	const total = Number(aggr._sum.jumlahSetoran ?? 0);
	const nasabah = await tx.nasabahQurban.findUnique({
		where: { id: nasabahId },
		include: { targetHewan: true },
	});
	if (!nasabah) return;
	const target = nasabah.targetHewan ? Number(nasabah.targetHewan.harga) : 0;
	await tx.nasabahQurban.update({
		where: { id: nasabahId },
		data: {
			totalTabungan: total,
			sisaTabungan: Math.max(0, target - total),
		},
	});
}

export const tabunganQurbanService = {
	async list(params: {
		page: number;
		limit: number;
		nasabahId?: string;
		status?: string;
		from?: Date;
		to?: Date;
	}) {
		const where: Prisma.TabunganQurbanWhereInput = {
			AND: [
				params.nasabahId ? { nasabahId: params.nasabahId } : {},
				params.status ? { status: params.status } : {},
				params.from ? { tanggalSetor: { gte: params.from } } : {},
				params.to ? { tanggalSetor: { lte: params.to } } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.tabunganQurban.count({ where }),
			prisma.tabunganQurban.findMany({
				where,
				include: { nasabah: true, hargaHewan: true },
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: string) {
		return prisma.tabunganQurban.findUnique({
			where: { id },
			include: { nasabah: true, hargaHewan: true },
		});
	},

	async create(input: TabunganCreateInput & { isOnline?: boolean }) {
		return prisma.$transaction(async (tx) => {
			const created = await tx.tabunganQurban.create({
				data: {
					id: uuidv4(),
					nasabahId: input.nasabahId,
					hargaHewanId: input.hargaHewanId,
					jumlahSetoran: input.jumlahSetoran,
					tanggalSetor: input.tanggalSetor ?? new Date(),
					keterangan: input.keterangan ?? null,
					metodePembayaran: input.metodePembayaran ?? null,
					status: input.isOnline ? "pending" : (input.status ?? "success"),
				},
				include: { nasabah: true, hargaHewan: true },
			});
			await recalcNasabahSaldo(tx, created.nasabahId);
			return created;
		});
	},

	async update(id: string, input: TabunganUpdateInput) {
		return prisma.$transaction(async (tx) => {
			const before = await tx.tabunganQurban.findUnique({ where: { id } });
			const updated = await tx.tabunganQurban.update({
				where: { id },
				data: input,
				include: { nasabah: true, hargaHewan: true },
			});
			await recalcNasabahSaldo(tx, updated.nasabahId);
			if (before && before.nasabahId !== updated.nasabahId) {
				await recalcNasabahSaldo(tx, before.nasabahId);
			}
			return updated;
		});
	},

	async delete(id: string) {
		await prisma.$transaction(async (tx) => {
			const existing = await tx.tabunganQurban.findUnique({ where: { id } });
			await tx.tabunganQurban.delete({ where: { id } });
			if (existing) {
				await recalcNasabahSaldo(tx, existing.nasabahId);
			}
		});
	},
};
