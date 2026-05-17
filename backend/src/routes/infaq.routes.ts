import { Router } from "express";
import { infaqController } from "@/controllers/infaq.controller";
import { authOptional, authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	infaqCreateSchema,
	infaqUpdateSchema,
} from "@/validators/infaq.schema";

export const infaqRouter = Router();

// Public POST for online donations; list/get/update/delete are admin
infaqRouter.get("/summary", authOptional, infaqController.summary);
infaqRouter.post(
	"/",
	authOptional,
	validate(infaqCreateSchema),
	infaqController.create,
);

infaqRouter.use(authRequired);
infaqRouter.get("/", infaqController.list);
infaqRouter.get("/:id", validate(idParamSchema, "params"), infaqController.get);
infaqRouter.put(
	"/:id",
	validate(idParamSchema, "params"),
	validate(infaqUpdateSchema),
	infaqController.update,
);
infaqRouter.delete(
	"/:id",
	validate(idParamSchema, "params"),
	infaqController.remove,
);
