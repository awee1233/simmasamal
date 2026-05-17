import { Router } from "express";
import { penyaluranController } from "@/controllers/penyaluran.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { stringIdParamSchema } from "@/validators/common.schema";
import {
	penyaluranCreateSchema,
	penyaluranUpdateSchema,
} from "@/validators/penyaluran.schema";

export const penyaluranRouter = Router();

penyaluranRouter.use(authRequired);
penyaluranRouter.get("/", penyaluranController.list);
penyaluranRouter.post(
	"/",
	validate(penyaluranCreateSchema),
	penyaluranController.create,
);
penyaluranRouter.get(
	"/:id",
	validate(stringIdParamSchema, "params"),
	penyaluranController.get,
);
penyaluranRouter.put(
	"/:id",
	validate(stringIdParamSchema, "params"),
	validate(penyaluranUpdateSchema),
	penyaluranController.update,
);
penyaluranRouter.delete(
	"/:id",
	validate(stringIdParamSchema, "params"),
	penyaluranController.remove,
);
