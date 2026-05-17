import { Router } from "express";
import { petugasQurbanController } from "@/controllers/petugas-qurban.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { stringIdParamSchema } from "@/validators/common.schema";
import {
	petugasQurbanCreateSchema,
	petugasQurbanUpdateSchema,
} from "@/validators/petugas-qurban.schema";

export const petugasQurbanRouter = Router();

petugasQurbanRouter.use(authRequired);
petugasQurbanRouter.get("/", petugasQurbanController.list);
petugasQurbanRouter.post(
	"/",
	validate(petugasQurbanCreateSchema),
	petugasQurbanController.create,
);
petugasQurbanRouter.get(
	"/:id",
	validate(stringIdParamSchema, "params"),
	petugasQurbanController.get,
);
petugasQurbanRouter.put(
	"/:id",
	validate(stringIdParamSchema, "params"),
	validate(petugasQurbanUpdateSchema),
	petugasQurbanController.update,
);
petugasQurbanRouter.delete(
	"/:id",
	validate(stringIdParamSchema, "params"),
	petugasQurbanController.remove,
);
