import { Router } from "express";
import { penerimaQurbanController } from "@/controllers/penerima-qurban.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { stringIdParamSchema } from "@/validators/common.schema";
import {
	penerimaQurbanCreateSchema,
	penerimaQurbanUpdateSchema,
} from "@/validators/penerima-qurban.schema";

export const penerimaQurbanRouter = Router();

penerimaQurbanRouter.use(authRequired);
penerimaQurbanRouter.get("/", penerimaQurbanController.list);
penerimaQurbanRouter.post(
	"/",
	validate(penerimaQurbanCreateSchema),
	penerimaQurbanController.create,
);
penerimaQurbanRouter.get(
	"/:id",
	validate(stringIdParamSchema, "params"),
	penerimaQurbanController.get,
);
penerimaQurbanRouter.put(
	"/:id",
	validate(stringIdParamSchema, "params"),
	validate(penerimaQurbanUpdateSchema),
	penerimaQurbanController.update,
);
penerimaQurbanRouter.delete(
	"/:id",
	validate(stringIdParamSchema, "params"),
	penerimaQurbanController.remove,
);
