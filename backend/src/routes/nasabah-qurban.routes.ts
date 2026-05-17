import { Router } from "express";
import { nasabahQurbanController } from "@/controllers/nasabah-qurban.controller";
import { authOptional, authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { stringIdParamSchema } from "@/validators/common.schema";
import {
	nasabahCreateSchema,
	nasabahUpdateSchema,
} from "@/validators/nasabah-qurban.schema";

export const nasabahQurbanRouter = Router();

// Create is mixed (public qurban registration)
nasabahQurbanRouter.post(
	"/",
	authOptional,
	validate(nasabahCreateSchema),
	nasabahQurbanController.create,
);

nasabahQurbanRouter.use(authRequired);
nasabahQurbanRouter.get("/", nasabahQurbanController.list);
nasabahQurbanRouter.get(
	"/:id",
	validate(stringIdParamSchema, "params"),
	nasabahQurbanController.get,
);
nasabahQurbanRouter.put(
	"/:id",
	validate(stringIdParamSchema, "params"),
	validate(nasabahUpdateSchema),
	nasabahQurbanController.update,
);
nasabahQurbanRouter.delete(
	"/:id",
	validate(stringIdParamSchema, "params"),
	nasabahQurbanController.remove,
);
