import cors from "cors";
import express, { type Express } from "express";
import { env } from "@/lib/env";
import { disconnectPrisma } from "@/lib/prisma";
import { errorHandler, notFoundHandler } from "@/middleware/error-handler";
import { apiRouter } from "@/routes";

export function createApp(): Express {
	const app = express();

	app.use(
		cors({
			origin: env.cors.origin.split(",").map((s) => s.trim()),
			credentials: true,
		}),
	);
	app.use(express.json({ limit: "10mb" }));
	app.use(express.urlencoded({ extended: true }));

	app.use("/uploads", express.static(env.uploadDir));

	app.use("/api", apiRouter);

	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
}

if (require.main === module) {
	const app = createApp();
	const server = app.listen(env.port, () => {
		// eslint-disable-next-line no-console
		console.log(
			`[simmasamal-backend] listening on http://localhost:${env.port} (${env.nodeEnv})`,
		);
	});

	const shutdown = async (signal: string) => {
		// eslint-disable-next-line no-console
		console.log(`[simmasamal-backend] ${signal} received, shutting down...`);
		server.close();
		await disconnectPrisma();
		process.exit(0);
	};

	process.on("SIGINT", () => void shutdown("SIGINT"));
	process.on("SIGTERM", () => void shutdown("SIGTERM"));
}
