import { randomBytes } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import type {
	NasabahCreateInput,
	NasabahUpdateInput,
} from "@/validators/nasabah-qurban.schema";

function generateRefId(): string {
	return randomBytes(4).toString("hex").toUpperCase();
}

export const nasabahQurbanService = {
	async list(params: { page: number; limit: number; search?: string }) {
		const where: Prisma.NasabahQurbanWhereInput = params.search
			? {
					OR: [
						{ nama: { contains: params.search, mode: "insensitive" } },
						{ nik: { contains: params.search } },
						{ refId: { contains: params.search, mode: "insensitive" } },
					],
				}
			: {};
		const [total, items] = await Promise.all([
			prisma.nasabahQurban.count({ where }),
			prisma.nasabahQurban.findMany({
				where,
				include: { targetHewan: true },
				orderBy: { createdAt: "desc" },
				skip: (params.page - 1) * params.limit,
				take: params.limit,
			}),
		]);
		return { total, items };
	},

	async findById(id: string) {
		return prisma.nasabahQurban.findUnique({
			where: { id },
			include: {
				targetHewan: true,
				tabungans: { orderBy: { tanggalSetor: "desc" } },
			},
		});
	},

	async create(input: NasabahCreateInput) {
		return prisma.nasabahQurban.create({
			data: {
				id: uuidv4(),
				nik: input.nik,
				nama: input.nama,
				hp: input.hp,
				alamat: input.alamat,
				refId: input.refId ?? generateRefId(),
				targetHewanId: input.targetHewanId ?? null,
			},
		});
	},

	async update(id: string, input: NasabahUpdateInput) {
		return prisma.nasabahQurban.update({
			where: { id },
			data: input,
		});
	},

	async delete(id: string) {
		await prisma.nasabahQurban.delete({ where: { id } });
	},
};
