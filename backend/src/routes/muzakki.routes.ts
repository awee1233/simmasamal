import { Router } from "express";
import { muzakkiController } from "@/controllers/muzakki.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	muzakkiCreateSchema,
	muzakkiUpdateSchema,
} from "@/validators/muzakki.schema";

export const muzakkiRouter = Router();

muzakkiRouter.use(authRequired);

muzakkiRouter.get("/", muzakkiController.list);
muzakkiRouter.post(
	"/",
	validate(muzakkiCreateSchema),
	muzakkiController.create,
);
muzakkiRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	muzakkiController.get,
);
muzakkiRouter.put(
	"/:id",
	validate(idParamSchema, "params"),
	validate(muzakkiUpdateSchema),
	muzakkiController.update,
);
muzakkiRouter.delete(
	"/:id",
	validate(idParamSchema, "params"),
	muzakkiController.remove,
);
