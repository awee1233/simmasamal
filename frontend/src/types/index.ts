export type Jabatan = "Administrator" | "Bendahara DKM" | "Petugas Qurban";

export interface AuthUser {
	id: number;
	name: string;
	email: string;
	jabatan: Jabatan;
	createdAt: string;
	updatedAt: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	user: AuthUser;
}

export interface PaginationMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}
