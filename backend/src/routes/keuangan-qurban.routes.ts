import { Router } from "express";
import { keuanganQurbanController } from "@/controllers/keuangan-qurban.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { stringIdParamSchema } from "@/validators/common.schema";
import {
	keuanganQurbanCreateSchema,
	keuanganQurbanUpdateSchema,
} from "@/validators/keuangan-qurban.schema";

export const keuanganQurbanRouter = Router();

keuanganQurbanRouter.use(authRequired);
keuanganQurbanRouter.get("/summary", keuanganQurbanController.summary);
keuanganQurbanRouter.get("/", keuanganQurbanController.list);
keuanganQurbanRouter.post(
	"/",
	validate(keuanganQurbanCreateSchema),
	keuanganQurbanController.create,
);
keuanganQurbanRouter.get(
	"/:id",
	validate(stringIdParamSchema, "params"),
	keuanganQurbanController.get,
);
keuanganQurbanRouter.put(
	"/:id",
	validate(stringIdParamSchema, "params"),
	validate(keuanganQurbanUpdateSchema),
	keuanganQurbanController.update,
);
keuanganQurbanRouter.delete(
	"/:id",
	validate(stringIdParamSchema, "params"),
	keuanganQurbanController.remove,
);
