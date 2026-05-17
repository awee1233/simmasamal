import { Router } from "express";
import { shohibulQurbanController } from "@/controllers/shohibul-qurban.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { stringIdParamSchema } from "@/validators/common.schema";
import {
	shohibulQurbanCreateSchema,
	shohibulQurbanUpdateSchema,
} from "@/validators/shohibul-qurban.schema";

export const shohibulQurbanRouter = Router();

shohibulQurbanRouter.use(authRequired);
shohibulQurbanRouter.get("/", shohibulQurbanController.list);
shohibulQurbanRouter.post(
	"/",
	validate(shohibulQurbanCreateSchema),
	shohibulQurbanController.create,
);
shohibulQurbanRouter.get(
	"/:id",
	validate(stringIdParamSchema, "params"),
	shohibulQurbanController.get,
);
shohibulQurbanRouter.put(
	"/:id",
	validate(stringIdParamSchema, "params"),
	validate(shohibulQurbanUpdateSchema),
	shohibulQurbanController.update,
);
shohibulQurbanRouter.delete(
	"/:id",
	validate(stringIdParamSchema, "params"),
	shohibulQurbanController.remove,
);
