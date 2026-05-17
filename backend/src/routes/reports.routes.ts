import { Router } from "express";
import { reportsController } from "@/controllers/reports.controller";
import { authRequired } from "@/middleware/auth";

export const reportsRouter = Router();

reportsRouter.use(authRequired);

reportsRouter.get("/zakat", reportsController.zakat);
reportsRouter.get("/infaq", reportsController.infaq);
reportsRouter.get("/pengeluaran", reportsController.pengeluaran);
reportsRouter.get("/shohibul-qurban", reportsController.shohibulQurban);
reportsRouter.get("/keuangan-qurban", reportsController.keuanganQurban);
reportsRouter.get("/nametag-qurban", reportsController.nametagQurban);
