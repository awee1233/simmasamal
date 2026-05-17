import { Router } from "express";
import { donaturController } from "@/controllers/donatur.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	donaturCreateSchema,
	donaturUpdateSchema,
} from "@/validators/donatur.schema";

export const donaturRouter = Router();

// POST is public (for online infaq). Other endpoints require auth.
donaturRouter.post(
	"/",
	validate(donaturCreateSchema),
	donaturController.create,
);

donaturRouter.use(authRequired);
donaturRouter.get("/", donaturController.list);
donaturRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	donaturController.get,
);
donaturRouter.put(
	"/:id",
	validate(idParamSchema, "params"),
	validate(donaturUpdateSchema),
	donaturController.update,
);
donaturRouter.delete(
	"/:id",
	validate(idParamSchema, "params"),
	donaturController.remove,
);
