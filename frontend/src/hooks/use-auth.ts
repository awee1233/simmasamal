import { create } from "zustand";
import { apiClient, type ApiEnvelope } from "@/lib/api-client";
import { tokenStorage } from "@/lib/auth-storage";
import type { AuthUser, LoginResponse } from "@/types";

interface AuthState {
	user: AuthUser | null;
	status: "idle" | "loading" | "authenticated" | "anonymous";
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	fetchMe: () => Promise<void>;
	bootstrap: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	status: "idle",
	error: null,
	async login(email, password) {
		set({ status: "loading", error: null });
		try {
			const res = await apiClient.post<ApiEnvelope<LoginResponse>>(
				"/auth/login",
				{
					email,
					password,
				},
			);
			const { accessToken, refreshToken, user } = res.data.data;
			tokenStorage.setTokens(accessToken, refreshToken);
			set({ user, status: "authenticated", error: null });
		} catch (err) {
			const message =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message ?? "Login gagal";
			tokenStorage.clear();
			set({ user: null, status: "anonymous", error: message });
			throw err;
		}
	},
	logout() {
		tokenStorage.clear();
		set({ user: null, status: "anonymous", error: null });
	},
	async fetchMe() {
		try {
			const res = await apiClient.get<ApiEnvelope<AuthUser>>("/auth/me");
			set({ user: res.data.data, status: "authenticated", error: null });
		} catch {
			tokenStorage.clear();
			set({ user: null, status: "anonymous" });
		}
	},
	async bootstrap() {
		if (!tokenStorage.getAccess()) {
			set({ status: "anonymous" });
			return;
		}
		set({ status: "loading" });
		try {
			const res = await apiClient.get<ApiEnvelope<AuthUser>>("/auth/me");
			set({ user: res.data.data, status: "authenticated", error: null });
		} catch {
			tokenStorage.clear();
			set({ user: null, status: "anonymous" });
		}
	},
}));

export function useAuth() {
	const user = useAuthStore((s) => s.user);
	const status = useAuthStore((s) => s.status);
	const error = useAuthStore((s) => s.error);
	const login = useAuthStore((s) => s.login);
	const logout = useAuthStore((s) => s.logout);
	return { user, status, error, login, logout };
}
