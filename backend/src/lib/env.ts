import "dotenv/config";

export const env = {
	nodeEnv: process.env.NODE_ENV ?? "development",
	port: Number(process.env.PORT ?? 3001),
	databaseUrl: process.env.DATABASE_URL ?? "",
	jwt: {
		accessSecret: process.env.JWT_ACCESS_SECRET ?? "dev-access-secret",
		refreshSecret: process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret",
		accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
		refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
	},
	cors: {
		origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
	},
	midtrans: {
		serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
		clientKey: process.env.MIDTRANS_CLIENT_KEY ?? "",
		isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
	},
	waha: {
		baseUrl: process.env.WAHA_BASE_URL ?? "http://localhost:3000",
		session: process.env.WAHA_SESSION ?? "default",
		apiKey: process.env.WAHA_API_KEY ?? "",
	},
	uploadDir: process.env.UPLOAD_DIR ?? "./uploads",
	publicBaseUrl: process.env.PUBLIC_BASE_URL ?? "http://localhost:3001",
};
