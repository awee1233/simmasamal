import { Router } from "express";
import { sholatController } from "@/controllers/sholat.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	sholatCreateSchema,
	sholatUpdateSchema,
} from "@/validators/sholat.schema";

export const sholatRouter = Router();

// Public GET
sholatRouter.get("/", sholatController.list);
sholatRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	sholatController.get,
);

// Auth-required writes
sholatRouter.post(
	"/",
	authRequired,
	validate(sholatCreateSchema),
	sholatController.create,
);
sholatRouter.put(
	"/:id",
	authRequired,
	validate(idParamSchema, "params"),
	validate(sholatUpdateSchema),
	sholatController.update,
);
sholatRouter.delete(
	"/:id",
	authRequired,
	validate(idParamSchema, "params"),
	sholatController.remove,
);
