import { Router } from "express";
import { paymentController } from "@/controllers/payment.controller";

export const paymentRouter = Router();

paymentRouter.post("/infaq/create", paymentController.createInfaq);
paymentRouter.post("/infaq/notification", paymentController.notifyInfaq);

paymentRouter.post("/zakat/create", paymentController.createZakat);
paymentRouter.post("/zakat/notification", paymentController.notifyZakat);

paymentRouter.post("/tabungan/create", paymentController.createTabungan);
paymentRouter.post("/tabungan/notification", paymentController.notifyTabungan);
