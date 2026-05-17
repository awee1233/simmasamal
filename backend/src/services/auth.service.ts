import type { Jabatan } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AppError, UnauthorizedError } from "@/utils/errors";
import {
	hashPassword,
	signAccessToken,
	signRefreshToken,
	verifyPassword,
	verifyRefreshToken,
} from "@/utils/jwt";

export interface UserDTO {
	id: number;
	name: string;
	email: string;
	jabatan: Jabatan;
	createdAt: Date;
	updatedAt: Date;
}

function toUserDTO(user: {
	id: number;
	name: string;
	email: string;
	jabatan: Jabatan;
	createdAt: Date;
	updatedAt: Date;
}): UserDTO {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		jabatan: user.jabatan,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
}

export const authService = {
	async login(email: string, password: string) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) throw new UnauthorizedError("Invalid credentials");
		const ok = await verifyPassword(password, user.password);
		if (!ok) throw new UnauthorizedError("Invalid credentials");

		const accessToken = signAccessToken({
			sub: user.id,
			email: user.email,
			jabatan: user.jabatan,
		});
		const refreshToken = signRefreshToken({ sub: user.id });
		return { accessToken, refreshToken, user: toUserDTO(user) };
	},

	async register(input: {
		name: string;
		email: string;
		password: string;
		jabatan: Jabatan;
	}) {
		const existing = await prisma.user.findUnique({
			where: { email: input.email },
		});
		if (existing) throw new AppError("Email already registered", 409);
		const user = await prisma.user.create({
			data: {
				name: input.name,
				email: input.email,
				password: await hashPassword(input.password),
				jabatan: input.jabatan,
			},
		});
		return toUserDTO(user);
	},

	async refresh(refreshToken: string) {
		const payload = verifyRefreshToken(refreshToken);
		const user = await prisma.user.findUnique({ where: { id: payload.sub } });
		if (!user) throw new UnauthorizedError("User no longer exists");
		const accessToken = signAccessToken({
			sub: user.id,
			email: user.email,
			jabatan: user.jabatan,
		});
		return { accessToken };
	},

	async me(userId: number) {
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user) throw new UnauthorizedError("User no longer exists");
		return toUserDTO(user);
	},

	async listUsers() {
		const users = await prisma.user.findMany({
			orderBy: { createdAt: "desc" },
		});
		return users.map(toUserDTO);
	},

	async updateUser(
		id: number,
		input: {
			name?: string;
			email?: string;
			password?: string;
			jabatan?: Jabatan;
		},
	) {
		const data: Record<string, unknown> = {};
		if (input.name !== undefined) data.name = input.name;
		if (input.email !== undefined) data.email = input.email;
		if (input.jabatan !== undefined) data.jabatan = input.jabatan;
		if (input.password) data.password = await hashPassword(input.password);
		const user = await prisma.user.update({ where: { id }, data });
		return toUserDTO(user);
	},

	async deleteUser(id: number) {
		await prisma.user.delete({ where: { id } });
	},
};
