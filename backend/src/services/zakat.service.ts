import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nextDateSequentialId } from "@/utils/id-generator";
import type {
	ZakatCreateInput,
	ZakatUpdateInput,
} from "@/validators/zakat.schema";

/**
 * Rice price per kg (rupiah). Used to compute berat_beras when jenis_bayar = "beras".
 * Per Requirement 4.5.
 */
const BERAS_PRICE_PER_KG = 14000;

function computeBeratBeras(
	jenisBayar: string,
	jumlahZakat: number,
): number | null {
	if (jenisBayar === "beras") {
		return jumlahZakat / BERAS_PRICE_PER_KG;
	}
	return null;
}

function nowHhmmss(date = new Date()): string {
	const hh = String(date.getHours()).padStart(2, "0");
	const mm = String(date.getMinutes()).padStart(2, "0");
	const ss = String(date.getSeconds()).padStart(2, "0");
	return `${hh}:${mm}:${ss}`;
}

export const zakatService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		jenisZakat?: string;
		from?: Date;
		to?: Date;
	}) {
		const where: Prisma.ZakatWhereInput = {
			AND: [
				params.search
					? {
							OR: [
								{ noZakat: { contains: params.search, mode: "insensitive" } },
								{ noMuzakki: { contains: params.search, mode: "insensitive" } },
								{
									petugasPenerima: {
										contains: params.search,
										mode: "insensitive",
									},
								},
							],
						}
					: {},
				params.jenisZakat ? { jenisZakat: params.jenisZakat } : {},
				params.from ? { tanggalZakat: { gte: params.from } } : {},
				params.to ? { tanggalZakat: { lte: params.to } } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.zakat.count({ where }),
			prisma.zakat.findMany({
				where,
				include: { muzakki: true },
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.zakat.findUnique({
			where: { id },
			include: { muzakki: true },
		});
	},

	async create(input: ZakatCreateInput) {
		const tanggalZakat = input.tanggalZakat ?? new Date();
		const noZakat = await nextDateSequentialId({
			table: "zakat",
			column: "noZakat",
			prefix: "ZK",
			width: 3,
			date: tanggalZakat,
		});
		const beratBeras = computeBeratBeras(input.jenisBayar, input.jumlahZakat);
		return prisma.zakat.create({
			data: {
				noZakat,
				tanggalZakat,
				jamZakat: input.jamZakat ?? nowHhmmss(),
				petugasPenerima: input.petugasPenerima,
				noMuzakki: input.noMuzakki,
				jenisZakat: input.jenisZakat,
				jumlahZakat: input.jumlahZakat,
				jenisBayar: input.jenisBayar,
				beratBeras,
				status: input.status ?? "success",
			},
		});
	},

	async update(id: number, input: ZakatUpdateInput) {
		const current = await prisma.zakat.findUnique({ where: { id } });
		if (!current) throw new Error("Zakat not found");
		const jenisBayar = input.jenisBayar ?? current.jenisBayar;
		const jumlahZakat = input.jumlahZakat ?? Number(current.jumlahZakat);
		const beratBeras = computeBeratBeras(jenisBayar, jumlahZakat);
		return prisma.zakat.update({
			where: { id },
			data: {
				tanggalZakat: input.tanggalZakat,
				jamZakat: input.jamZakat,
				petugasPenerima: input.petugasPenerima,
				noMuzakki: input.noMuzakki,
				jenisZakat: input.jenisZakat,
				jumlahZakat: input.jumlahZakat,
				jenisBayar: input.jenisBayar,
				beratBeras,
				status: input.status,
			},
		});
	},

	async delete(id: number) {
		await prisma.zakat.delete({ where: { id } });
	},

	/**
	 * Summary: total per jenis_zakat (successful payments), distributed amounts,
	 * and outstanding balances. Also includes a beras balance (kg).
	 */
	async summary() {
		const zakatGroups = await prisma.zakat.groupBy({
			by: ["jenisZakat"],
			where: { status: "success" },
			_sum: { jumlahZakat: true, beratBeras: true },
		});
		const distributedGroups = await prisma.penyaluran.groupBy({
			by: ["jenisZakat"],
			_sum: { totalPenyaluran: true, berasDisalurkan: true },
		});

		const byType = new Map<
			string,
			{
				jenisZakat: string;
				totalZakat: number;
				totalBeras: number;
				totalPenyaluran: number;
				berasDisalurkan: number;
				saldo: number;
				beratBerasSaldo: number;
			}
		>();

		for (const g of zakatGroups) {
			byType.set(g.jenisZakat, {
				jenisZakat: g.jenisZakat,
				totalZakat: Number(g._sum.jumlahZakat ?? 0),
				totalBeras: Number(g._sum.beratBeras ?? 0),
				totalPenyaluran: 0,
				berasDisalurkan: 0,
				saldo: 0,
				beratBerasSaldo: 0,
			});
		}

		for (const g of distributedGroups) {
			const existing = byType.get(g.jenisZakat) ?? {
				jenisZakat: g.jenisZakat,
				totalZakat: 0,
				totalBeras: 0,
				totalPenyaluran: 0,
				berasDisalurkan: 0,
				saldo: 0,
				beratBerasSaldo: 0,
			};
			existing.totalPenyaluran = Number(g._sum.totalPenyaluran ?? 0);
			existing.berasDisalurkan = Number(g._sum.berasDisalurkan ?? 0);
			byType.set(g.jenisZakat, existing);
		}

		for (const entry of byType.values()) {
			entry.saldo = entry.totalZakat - entry.totalPenyaluran;
			entry.beratBerasSaldo = entry.totalBeras - entry.berasDisalurkan;
		}

		const byJenisZakat = Array.from(byType.values());
		const totalSaldo = byJenisZakat.reduce((sum, e) => sum + e.saldo, 0);
		const totalBerasSaldo = byJenisZakat.reduce(
			(sum, e) => sum + e.beratBerasSaldo,
			0,
		);

		return { byJenisZakat, totalSaldo, totalBerasSaldo };
	},
};
