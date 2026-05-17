const ACCESS_KEY = "simmasamal.accessToken";
const REFRESH_KEY = "simmasamal.refreshToken";

export const tokenStorage = {
	getAccess(): string | null {
		try {
			return localStorage.getItem(ACCESS_KEY);
		} catch {
			return null;
		}
	},
	getRefresh(): string | null {
		try {
			return localStorage.getItem(REFRESH_KEY);
		} catch {
			return null;
		}
	},
	setTokens(access: string, refresh: string): void {
		try {
			localStorage.setItem(ACCESS_KEY, access);
			localStorage.setItem(REFRESH_KEY, refresh);
		} catch {
			/* ignore */
		}
	},
	clear(): void {
		try {
			localStorage.removeItem(ACCESS_KEY);
			localStorage.removeItem(REFRESH_KEY);
		} catch {
			/* ignore */
		}
	},
};
