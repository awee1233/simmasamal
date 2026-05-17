import { Router } from "express";
import { aturanPembagianRouter } from "./aturan-pembagian.routes";
import { authRouter } from "./auth.routes";
import { donaturRouter } from "./donatur.routes";
import { hargaHewanRouter } from "./harga-hewan.routes";
import { infaqRouter } from "./infaq.routes";
import { inventoryRouter } from "./inventory.routes";
import { kajianRouter } from "./kajian.routes";
import { keuanganQurbanRouter } from "./keuangan-qurban.routes";
import { mustahikRouter } from "./mustahik.routes";
import { muzakkiRouter } from "./muzakki.routes";
import { nasabahQurbanRouter } from "./nasabah-qurban.routes";
import { paymentRouter } from "./payment.routes";
import { pembagianProdukRouter } from "./pembagian-produk.routes";
import { penerimaQurbanRouter } from "./penerima-qurban.routes";
import { pengeluaranRouter } from "./pengeluaran.routes";
import { penyaluranRouter } from "./penyaluran.routes";
import { petugasQurbanRouter } from "./petugas-qurban.routes";
import { reportsRouter } from "./reports.routes";
import { shohibulQurbanRouter } from "./shohibul-qurban.routes";
import { sholatRouter } from "./sholat.routes";
import { tabunganQurbanRouter } from "./tabungan-qurban.routes";
import { zakatRouter } from "./zakat.routes";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
	res.json({
		status: "success",
		message: "API is healthy",
		data: { uptime: process.uptime() },
	});
});

// Auth
apiRouter.use("/auth", authRouter);

// Zakat domain
apiRouter.use("/muzakki", muzakkiRouter);
apiRouter.use("/mustahik", mustahikRouter);
apiRouter.use("/zakat", zakatRouter);
apiRouter.use("/penyaluran", penyaluranRouter);

// Infaq domain
apiRouter.use("/donatur", donaturRouter);
apiRouter.use("/infaq", infaqRouter);
apiRouter.use("/pengeluaran", pengeluaranRouter);

// Qurban domain
apiRouter.use("/shohibul-qurban", shohibulQurbanRouter);
apiRouter.use("/nasabah-qurban", nasabahQurbanRouter);
apiRouter.use("/tabungan-qurban", tabunganQurbanRouter);
apiRouter.use("/harga-hewan", hargaHewanRouter);
apiRouter.use("/keuangan-qurban", keuanganQurbanRouter);
apiRouter.use("/penerima-qurban", penerimaQurbanRouter);
apiRouter.use("/petugas-qurban", petugasQurbanRouter);
apiRouter.use("/aturan-pembagian", aturanPembagianRouter);
apiRouter.use("/pembagian-produk", pembagianProdukRouter);

// Public info
apiRouter.use("/sholat", sholatRouter);
apiRouter.use("/kajian", kajianRouter);
apiRouter.use("/inventory", inventoryRouter);

// Payment + reports
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/reports", reportsRouter);
