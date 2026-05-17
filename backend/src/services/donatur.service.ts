import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nextSequentialId } from "@/utils/id-generator";
import { formatIndonesianPhone } from "@/utils/phone";
import type {
	DonaturCreateInput,
	DonaturUpdateInput,
} from "@/validators/donatur.schema";

export const donaturService = {
	async list(params: { page: number; limit: number; search?: string }) {
		const where: Prisma.DonaturWhereInput = params.search
			? {
					OR: [
						{ nama: { contains: params.search, mode: "insensitive" } },
						{ noDonatur: { contains: params.search, mode: "insensitive" } },
						{ noTelepon: { contains: params.search } },
						{ email: { contains: params.search, mode: "insensitive" } },
					],
				}
			: {};
		const [total, items] = await Promise.all([
			prisma.donatur.count({ where }),
			prisma.donatur.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.donatur.findUnique({ where: { id } });
	},

	/**
	 * Create a donatur. If a donatur with the same formatted phone exists, update that record
	 * instead of creating a duplicate (per Requirement 6.5).
	 */
	async createOrUpdate(input: DonaturCreateInput) {
		const noTelepon = formatIndonesianPhone(input.noTelepon);
		const existing = await prisma.donatur.findFirst({ where: { noTelepon } });
		if (existing) {
			return prisma.donatur.update({
				where: { id: existing.id },
				data: {
					nama: input.nama,
					email: input.email ?? existing.email,
					pekerjaan: input.pekerjaan ?? existing.pekerjaan,
					alamat: input.alamat ?? existing.alamat,
					anonim: input.anonim ?? existing.anonim,
					pesanDoa: input.pesanDoa ?? existing.pesanDoa,
				},
			});
		}
		const noDonatur = await nextSequentialId({
			table: "donatur",
			column: "noDonatur",
			prefix: "DN",
			width: 3,
		});
		return prisma.donatur.create({
			data: {
				noDonatur,
				nama: input.nama,
				noTelepon,
				email: input.email ?? null,
				pekerjaan: input.pekerjaan ?? null,
				alamat: input.alamat ?? null,
				anonim: input.anonim ?? "tidak",
				pesanDoa: input.pesanDoa ?? null,
			},
		});
	},

	async update(id: number, input: DonaturUpdateInput) {
		return prisma.donatur.update({
			where: { id },
			data: {
				nama: input.nama,
				noTelepon: input.noTelepon
					? formatIndonesianPhone(input.noTelepon)
					: undefined,
				email: input.email,
				pekerjaan: input.pekerjaan,
				alamat: input.alamat,
				anonim: input.anonim,
				pesanDoa: input.pesanDoa,
			},
		});
	},

	async delete(id: number) {
		await prisma.donatur.delete({ where: { id } });
	},
};
