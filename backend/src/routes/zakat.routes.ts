import { Router } from "express";
import { zakatController } from "@/controllers/zakat.controller";
import { authRequired } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { idParamSchema } from "@/validators/common.schema";
import {
	zakatCreateSchema,
	zakatUpdateSchema,
} from "@/validators/zakat.schema";

export const zakatRouter = Router();

zakatRouter.use(authRequired);
zakatRouter.get("/summary", zakatController.summary);
zakatRouter.get("/", zakatController.list);
zakatRouter.post("/", validate(zakatCreateSchema), zakatController.create);
zakatRouter.get("/:id", validate(idParamSchema, "params"), zakatController.get);
zakatRouter.put(
	"/:id",
	validate(idParamSchema, "params"),
	validate(zakatUpdateSchema),
	zakatController.update,
);
zakatRouter.delete(
	"/:id",
	validate(idParamSchema, "params"),
	zakatController.remove,
);
