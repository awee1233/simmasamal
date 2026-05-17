import { Router } from "express";
import { tabunganQurbanController } from "@/controllers/tabungan-qurban.controller";
import { authOptional, authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { stringIdParamSchema } from "@/validators/common.schema";
import {
	tabunganCreateSchema,
	tabunganUpdateSchema,
} from "@/validators/tabungan-qurban.schema";

export const tabunganQurbanRouter = Router();

tabunganQurbanRouter.post(
	"/",
	authOptional,
	validate(tabunganCreateSchema),
	tabunganQurbanController.create,
);

tabunganQurbanRouter.use(authRequired);
tabunganQurbanRouter.get("/", tabunganQurbanController.list);
tabunganQurbanRouter.get(
	"/:id",
	validate(stringIdParamSchema, "params"),
	tabunganQurbanController.get,
);
tabunganQurbanRouter.put(
	"/:id",
	validate(stringIdParamSchema, "params"),
	validate(tabunganUpdateSchema),
	tabunganQurbanController.update,
);
tabunganQurbanRouter.delete(
	"/:id",
	validate(stringIdParamSchema, "params"),
	tabunganQurbanController.remove,
);
