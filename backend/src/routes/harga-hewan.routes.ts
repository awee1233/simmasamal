import { Router } from "express";
import { hargaHewanController } from "@/controllers/harga-hewan.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { stringIdParamSchema } from "@/validators/common.schema";
import {
	hargaHewanCreateSchema,
	hargaHewanUpdateSchema,
} from "@/validators/harga-hewan.schema";

export const hargaHewanRouter = Router();

// Public list/get
hargaHewanRouter.get("/", hargaHewanController.list);
hargaHewanRouter.get(
	"/:id",
	validate(stringIdParamSchema, "params"),
	hargaHewanController.get,
);

// Auth required for writes
hargaHewanRouter.post(
	"/",
	authRequired,
	validate(hargaHewanCreateSchema),
	hargaHewanController.create,
);
hargaHewanRouter.put(
	"/:id",
	authRequired,
	validate(stringIdParamSchema, "params"),
	validate(hargaHewanUpdateSchema),
	hargaHewanController.update,
);
hargaHewanRouter.delete(
	"/:id",
	authRequired,
	validate(stringIdParamSchema, "params"),
	hargaHewanController.remove,
);
