import { Router } from "express";
import { pembagianProdukController } from "@/controllers/pembagian-produk.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	pembagianProdukCreateSchema,
	pembagianProdukUpdateSchema,
} from "@/validators/pembagian-produk.schema";

export const pembagianProdukRouter = Router();

pembagianProdukRouter.use(authRequired);
pembagianProdukRouter.get("/", pembagianProdukController.list);
pembagianProdukRouter.post(
	"/",
	validate(pembagianProdukCreateSchema),
	pembagianProdukController.create,
);
pembagianProdukRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	pembagianProdukController.get,
);
pembagianProdukRouter.put(
	"/:id",
	validate(idParamSchema, "params"),
	validate(pembagianProdukUpdateSchema),
	pembagianProdukController.update,
);
pembagianProdukRouter.delete(
	"/:id",
	validate(idParamSchema, "params"),
	pembagianProdukController.remove,
);
