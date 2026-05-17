import { Router } from "express";
import { pengeluaranController } from "@/controllers/pengeluaran.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	pengeluaranCreateSchema,
	pengeluaranUpdateSchema,
} from "@/validators/pengeluaran.schema";

export const pengeluaranRouter = Router();

pengeluaranRouter.use(authRequired);
pengeluaranRouter.get("/", pengeluaranController.list);
pengeluaranRouter.post(
	"/",
	validate(pengeluaranCreateSchema),
	pengeluaranController.create,
);
pengeluaranRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	pengeluaranController.get,
);
pengeluaranRouter.put(
	"/:id",
	validate(idParamSchema, "params"),
	validate(pengeluaranUpdateSchema),
	pengeluaranController.update,
);
pengeluaranRouter.delete(
	"/:id",
	validate(idParamSchema, "params"),
	pengeluaranController.remove,
);
