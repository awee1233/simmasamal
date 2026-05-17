import { Router } from "express";
import { kajianController } from "@/controllers/kajian.controller";
import { authRequired } from "@/middleware/auth";
import { imageUpload } from "@/middleware/upload";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	kajianCreateSchema,
	kajianUpdateSchema,
} from "@/validators/kajian.schema";

export const kajianRouter = Router();

const upload = imageUpload("kajian");

// Public GET
kajianRouter.get("/", kajianController.list);
kajianRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	kajianController.get,
);

// Auth writes with optional image fields
kajianRouter.post(
	"/",
	authRequired,
	upload.fields([
		{ name: "fotoKajian", maxCount: 1 },
		{ name: "fotoUstad", maxCount: 1 },
	]),
	validate(kajianCreateSchema),
	kajianController.create,
);
kajianRouter.put(
	"/:id",
	authRequired,
	validate(idParamSchema, "params"),
	upload.fields([
		{ name: "fotoKajian", maxCount: 1 },
		{ name: "fotoUstad", maxCount: 1 },
	]),
	validate(kajianUpdateSchema),
	kajianController.update,
);
kajianRouter.delete(
	"/:id",
	authRequired,
	validate(idParamSchema, "params"),
	kajianController.remove,
);
