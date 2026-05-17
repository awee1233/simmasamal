import { Router } from "express";
import { aturanPembagianController } from "@/controllers/aturan-pembagian.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import {
	aturanPembagianCreateSchema,
	aturanPembagianUpdateSchema,
} from "@/validators/aturan-pembagian.schema";
import { idParamSchema } from "@/validators/common.schema";

export const aturanPembagianRouter = Router();

aturanPembagianRouter.use(authRequired);
aturanPembagianRouter.get("/", aturanPembagianController.list);
aturanPembagianRouter.post(
	"/",
	validate(aturanPembagianCreateSchema),
	aturanPembagianController.create,
);
aturanPembagianRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	aturanPembagianController.get,
);
aturanPembagianRouter.put(
	"/:id",
	validate(idParamSchema, "params"),
	validate(aturanPembagianUpdateSchema),
	aturanPembagianController.update,
);
aturanPembagianRouter.delete(
	"/:id",
	validate(idParamSchema, "params"),
	aturanPembagianController.remove,
);
