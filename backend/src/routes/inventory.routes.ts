import { Router } from "express";
import { inventoryController } from "@/controllers/inventory.controller";
import { authRequired } from "@/middleware/auth";
import { imageUpload } from "@/middleware/upload";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	inventoryCreateSchema,
	inventoryUpdateSchema,
} from "@/validators/inventory.schema";

export const inventoryRouter = Router();

const upload = imageUpload("inventory");

inventoryRouter.get("/", inventoryController.list);
inventoryRouter.get(
	"/:id",
	validate(idParamSchema, "params"),
	inventoryController.get,
);

inventoryRouter.post(
	"/",
	authRequired,
	upload.single("gambar"),
	validate(inventoryCreateSchema),
	inventoryController.create,
);
inventoryRouter.put(
	"/:id",
	authRequired,
	validate(idParamSchema, "params"),
	upload.single("gambar"),
	validate(inventoryUpdateSchema),
	inventoryController.update,
);
inventoryRouter.delete(
	"/:id",
	authRequired,
	validate(idParamSchema, "params"),
	inventoryController.remove,
);
