import { Router } from "express";
import { mustahikController } from "@/controllers/mustahik.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	mustahikCreateSchema,
	mustahikUpdateSchema,
} from "@/validators/mustahik.schema";

export const mustahikRouter = Router();

mustahikRouter.use(authRequired);
mustahikRouter.get("/", mustahikController.list);
mustahikRouter.post(
	"/",
	validate(mustahikCreateSchema),
	mustahikController.create,
);
mustahikRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	mustahikController.get,
);
mustahikRouter.put(
	"/:id",
	validate(idParamSchema, "params"),
	validate(mustahikUpdateSchema),
	mustahikController.update,
);
mustahikRouter.delete(
	"/:id",
	validate(idParamSchema, "params"),
	mustahikController.remove,
);
