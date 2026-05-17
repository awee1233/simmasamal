import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "./auth-storage";

export interface ApiEnvelope<T> {
	status: "success" | "error";
	message: string;
	data: T;
	meta?: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
	errors?: Record<string, string[]>;
}

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const apiClient = axios.create({
	baseURL,
	headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = tokenStorage.getAccess();
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
	const refreshToken = tokenStorage.getRefresh();
	if (!refreshToken) return null;
	try {
		const response = await axios.post<ApiEnvelope<{ accessToken: string }>>(
			`${baseURL}/auth/refresh`,
			{ refreshToken },
		);
		const access = response.data.data?.accessToken;
		if (access) {
			tokenStorage.setTokens(access, refreshToken);
			return access;
		}
		return null;
	} catch {
		tokenStorage.clear();
		return null;
	}
}

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const original = error.config as
			| (InternalAxiosRequestConfig & { _retry?: boolean })
			| undefined;
		if (
			error.response?.status === 401 &&
			original &&
			!original._retry &&
			!original.url?.includes("/auth/refresh")
		) {
			original._retry = true;
			if (!refreshing) refreshing = refreshAccessToken();
			const newToken = await refreshing;
			refreshing = null;
			if (newToken) {
				original.headers = original.headers ?? {};
				(original.headers as Record<string, string>).Authorization =
					`Bearer ${newToken}`;
				return apiClient(original);
			}
			tokenStorage.clear();
			if (typeof window !== "undefined") {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	},
);
