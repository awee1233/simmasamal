import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { padId } from "@/utils/id-generator";
import type {
	MustahikCreateInput,
	MustahikUpdateInput,
} from "@/validators/mustahik.schema";

async function nextMustahikNumber(): Promise<string> {
	const last = await prisma.mustahik.findFirst({
		orderBy: { noMustahik: "desc" },
		select: { noMustahik: true },
	});
	const lastSeq = last ? Number.parseInt(last.noMustahik, 10) || 0 : 0;
	return padId(lastSeq + 1, 5);
}

export const mustahikService = {
	async list(params: {
		page: number;
		limit: number;
		search?: string;
		asnaf?: string;
		rt?: string;
	}) {
		const where: Prisma.MustahikWhereInput = {
			AND: [
				params.search
					? {
							OR: [
								{
									namaMustahik: {
										contains: params.search,
										mode: "insensitive",
									},
								},
								{
									noMustahik: {
										contains: params.search,
										mode: "insensitive",
									},
								},
								{ noKk: { contains: params.search } },
							],
						}
					: {},
				params.asnaf ? { asnaf: params.asnaf } : {},
				params.rt ? { rt: params.rt } : {},
			],
		};
		const [total, items] = await Promise.all([
			prisma.mustahik.count({ where }),
			prisma.mustahik.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: number) {
		return prisma.mustahik.findUnique({ where: { id } });
	},

	async create(input: MustahikCreateInput) {
		const noMustahik = await nextMustahikNumber();
		return prisma.mustahik.create({
			data: {
				noMustahik,
				noKk: input.noKk,
				namaMustahik: input.namaMustahik,
				alamatMustahik: input.alamatMustahik,
				asnaf: input.asnaf,
				rt: input.rt,
				jumlahAnak: input.jumlahAnak ?? 0,
				tanggalInput: input.tanggalInput ?? new Date(),
			},
		});
	},

	async update(id: number, input: MustahikUpdateInput) {
		return prisma.mustahik.update({
			where: { id },
			data: input,
		});
	},

	async delete(id: number) {
		await prisma.mustahik.delete({ where: { id } });
	},
};
