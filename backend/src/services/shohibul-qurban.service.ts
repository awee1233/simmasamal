import type { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import type {
	ShohibulQurbanCreateInput,
	ShohibulQurbanUpdateInput,
} from "@/validators/shohibul-qurban.schema";

export const shohibulQurbanService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		tahunHijriah?: string;
		jenisHewan?: string;
	}) {
		const where: Prisma.ShohibulQurbanWhereInput = {
			AND: [
				params.search
					? {
							OR: [
								{ nama: { contains: params.search, mode: "insensitive" } },
								{ nik: { contains: params.search } },
							],
						}
					: {},
				params.tahunHijriah ? { tahunHijriah: params.tahunHijriah } : {},
				params.jenisHewan ? { jenisHewan: params.jenisHewan } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.shohibulQurban.count({ where }),
			prisma.shohibulQurban.findMany({
				where,
				include: { details: true },
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: string) {
		return prisma.shohibulQurban.findUnique({
			where: { id },
			include: { details: true },
		});
	},

	async create(input: ShohibulQurbanCreateInput) {
		const id = uuidv4();
		return prisma.shohibulQurban.create({
			data: {
				id,
				tahunHijriah: input.tahunHijriah,
				nik: input.nik,
				nama: input.nama,
				hp: input.hp,
				alamat: input.alamat,
				jenisHewan: input.jenisHewan,
				berat: input.berat,
				bagianDiminta: input.bagianDiminta,
				tanggal: input.tanggal,
				details: {
					create: input.details.map((d) => ({
						id: uuidv4(),
						nama: d.nama,
						binOrBinti: d.binOrBinti,
						binOrBintiValue: d.binOrBintiValue,
					})),
				},
			},
			include: { details: true },
		});
	},

	async update(id: string, input: ShohibulQurbanUpdateInput) {
		return prisma.$transaction(async (tx) => {
			if (input.details) {
				await tx.shohibulQurbanDetail.deleteMany({ where: { sqId: id } });
				await tx.shohibulQurbanDetail.createMany({
					data: input.details.map((d) => ({
						id: uuidv4(),
						sqId: id,
						nama: d.nama,
						binOrBinti: d.binOrBinti,
						binOrBintiValue: d.binOrBintiValue,
					})),
				});
			}
			return tx.shohibulQurban.update({
				where: { id },
				data: {
					tahunHijriah: input.tahunHijriah,
					nik: input.nik,
					nama: input.nama,
					hp: input.hp,
					alamat: input.alamat,
					jenisHewan: input.jenisHewan,
					berat: input.berat,
					bagianDiminta: input.bagianDiminta,
					tanggal: input.tanggal,
				},
				include: { details: true },
			});
		});
	},

	async delete(id: string) {
		await prisma.shohibulQurban.delete({ where: { id } });
	},
};
