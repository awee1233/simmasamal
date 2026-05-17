import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nextDateSequentialId } from "@/utils/id-generator";
import type {
	PenyaluranCreateInput,
	PenyaluranUpdateInput,
} from "@/validators/penyaluran.schema";

function nowHhmmss(date = new Date()): string {
	const hh = String(date.getHours()).padStart(2, "0");
	const mm = String(date.getMinutes()).padStart(2, "0");
	const ss = String(date.getSeconds()).padStart(2, "0");
	return `${hh}:${mm}:${ss}`;
}

export const penyaluranService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		jenisZakat?: string;
		from?: Date;
		to?: Date;
	}) {
		const where: Prisma.PenyaluranWhereInput = {
			AND: [
				params.search
					? {
							OR: [
								{
									noPenyaluran: {
										contains: params.search,
										mode: "insensitive",
									},
								},
								{
									petugasPenyaluran: {
										contains: params.search,
										mode: "insensitive",
									},
								},
							],
						}
					: {},
				params.jenisZakat ? { jenisZakat: params.jenisZakat } : {},
				params.from ? { tanggalPenyaluran: { gte: params.from } } : {},
				params.to ? { tanggalPenyaluran: { lte: params.to } } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.penyaluran.count({ where }),
			prisma.penyaluran.findMany({
				where,
				include: { penerimas: { include: { mustahik: true } } },
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findByNo(noPenyaluran: string) {
		return prisma.penyaluran.findUnique({
			where: { noPenyaluran },
			include: { penerimas: { include: { mustahik: true } } },
		});
	},

	async create(input: PenyaluranCreateInput) {
		const tanggal = input.tanggalPenyaluran ?? new Date();
		const noPenyaluran = await nextDateSequentialId({
			table: "penyaluran",
			column: "noPenyaluran",
			prefix: "PY",
			width: 3,
			date: tanggal,
		});

		return prisma.penyaluran.create({
			data: {
				noPenyaluran,
				tanggalPenyaluran: tanggal,
				jamPenyaluran: input.jamPenyaluran ?? nowHhmmss(),
				petugasPenyaluran: input.petugasPenyaluran,
				jenisZakat: input.jenisZakat,
				totalPenyaluran: input.totalPenyaluran,
				berasDisalurkan: input.berasDisalurkan ?? 0,
				statusPenyaluran: input.statusPenyaluran ?? "selesai",
				keterangan: input.keterangan ?? null,
				penerimas: {
					create: (input.penerimas ?? []).map((p) => ({
						mustahikId: p.mustahikId,
						jumlahTerima: p.jumlahTerima,
						jumlahTerimaUang: p.jumlahTerimaUang ?? null,
						jumlahTerimaBeras: p.jumlahTerimaBeras ?? null,
						statusPenerima: p.statusPenerima ?? "pending",
					})),
				},
			},
			include: { penerimas: { include: { mustahik: true } } },
		});
	},

	async update(noPenyaluran: string, input: PenyaluranUpdateInput) {
		// For simplicity: if penerimas is provided, replace the set.
		return prisma.$transaction(async (tx) => {
			if (input.penerimas) {
				await tx.penyaluranPenerima.deleteMany({ where: { noPenyaluran } });
				await tx.penyaluranPenerima.createMany({
					data: input.penerimas.map((p) => ({
						noPenyaluran,
						mustahikId: p.mustahikId,
						jumlahTerima: p.jumlahTerima,
						jumlahTerimaUang: p.jumlahTerimaUang ?? null,
						jumlahTerimaBeras: p.jumlahTerimaBeras ?? null,
						statusPenerima: p.statusPenerima ?? "pending",
					})),
				});
			}
			return tx.penyaluran.update({
				where: { noPenyaluran },
				data: {
					tanggalPenyaluran: input.tanggalPenyaluran,
					jamPenyaluran: input.jamPenyaluran,
					petugasPenyaluran: input.petugasPenyaluran,
					jenisZakat: input.jenisZakat,
					totalPenyaluran: input.totalPenyaluran,
					berasDisalurkan: input.berasDisalurkan,
					statusPenyaluran: input.statusPenyaluran,
					keterangan: input.keterangan,
				},
				include: { penerimas: { include: { mustahik: true } } },
			});
		});
	},

	async delete(noPenyaluran: string) {
		await prisma.penyaluran.delete({ where: { noPenyaluran } });
	},
};
