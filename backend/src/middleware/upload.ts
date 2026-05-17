import { existsSync, mkdirSync } from "node:fs";
import { extname, resolve } from "node:path";
import multer from "multer";
import { env } from "@/lib/env";

const uploadRoot = resolve(env.uploadDir);
if (!existsSync(uploadRoot)) {
	mkdirSync(uploadRoot, { recursive: true });
}

function ensureDir(dir: string): string {
	const full = resolve(uploadRoot, dir);
	if (!existsSync(full)) mkdirSync(full, { recursive: true });
	return full;
}

export function imageUpload(subdir: string) {
	const storage = multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, ensureDir(subdir));
		},
		filename: (_req, file, cb) => {
			const safeBase = file.originalname
				.replace(/\.[^.]+$/, "")
				.replace(/[^a-zA-Z0-9_-]/g, "_")
				.slice(0, 40);
			const stamp = Date.now();
			const rand = Math.random().toString(36).slice(2, 8);
			const ext = extname(file.originalname).toLowerCase();
			cb(null, `${safeBase}_${stamp}_${rand}${ext}`);
		},
	});
	return multer({
		storage,
		limits: { fileSize: 5 * 1024 * 1024 },
		fileFilter: (_req, file, cb) => {
			if (/^image\/(png|jpeg|jpg|webp|gif)$/i.test(file.mimetype)) {
				cb(null, true);
			} else {
				cb(new Error("Only image files are allowed"));
			}
		},
	});
}

/**
 * Convert a stored path (relative to uploads dir) into a publicly reachable URL.
 */
export function toPublicUrl(relativePath: string): string {
	return `${env.publicBaseUrl.replace(/\/+$/, "")}/uploads/${relativePath.replace(/^\/+/, "")}`;
}
