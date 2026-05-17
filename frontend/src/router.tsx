import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "@/components/auth-guard";
import { AdminLayout } from "@/components/layout/admin-layout";


// Import Mihrab pages
import MihrabHome from "@/pages/MihrabHome";
import MihrabLogin from "@/pages/MihrabLogin";
import MihrabZakat from "@/pages/MihrabZakat";

import { DashboardPage } from "@/pages/admin/dashboard-page";
import { DonaturAdminPage } from "@/pages/admin/donatur-admin-page";
import { HargaHewanAdminPage } from "@/pages/admin/harga-hewan-admin-page";
import { InfaqAdminPage } from "@/pages/admin/infaq-admin-page";
import { InventoryAdminPage } from "@/pages/admin/inventory-admin-page";
import { KajianAdminPage } from "@/pages/admin/kajian-admin-page";
import { KeuanganQurbanAdminPage } from "@/pages/admin/keuangan-qurban-admin-page";
import { MustahikAdminPage } from "@/pages/admin/mustahik-admin-page";
import { MuzakkiAdminPage } from "@/pages/admin/muzakki-admin-page";
import { NasabahQurbanAdminPage } from "@/pages/admin/nasabah-qurban-admin-page";
import { AturanPembagianAdminPage } from "@/pages/admin/aturan-pembagian-admin-page";
import { PenerimaQurbanAdminPage } from "@/pages/admin/penerima-qurban-admin-page";
import { PengeluaranAdminPage } from "@/pages/admin/pengeluaran-admin-page";
import { PenyaluranAdminPage } from "@/pages/admin/penyaluran-admin-page";
import { PetugasQurbanAdminPage } from "@/pages/admin/petugas-qurban-admin-page";
import { ReportsPage } from "@/pages/admin/reports-page";
import { ShohibulQurbanAdminPage } from "@/pages/admin/shohibul-qurban-admin-page";
import { SholatAdminPage } from "@/pages/admin/sholat-admin-page";
import { TabunganQurbanAdminPage } from "@/pages/admin/tabungan-qurban-admin-page";
import { UsersAdminPage } from "@/pages/admin/users-admin-page";
import { ZakatAdminPage } from "@/pages/admin/zakat-admin-page";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MihrabHome />,
	},
	{ path: "/login", element: <MihrabLogin /> },
	{ path: "/zakat", element: <MihrabZakat /> },
	{ path: "/infaq", element: <MihrabHome /> },
	{ path: "/qurban", element: <MihrabHome /> },
	{ path: "/kajian", element: <MihrabHome /> },
	{ path: "/sholat", element: <MihrabHome /> },
	{ path: "/kontak", element: <MihrabHome /> },
	{
		path: "/admin",
		element: (
			<AuthGuard>
				<AdminLayout />
			</AuthGuard>
		),
		children: [
			{ index: true, element: <DashboardPage /> },
			{
				path: "users",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<UsersAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "donatur",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<DonaturAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "muzakki",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<MuzakkiAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "mustahik",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<MustahikAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "zakat",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<ZakatAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "penyaluran",
				element: (
					<AuthGuard roles={["Administrator", "Bendahara DKM"]}>
						<PenyaluranAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "infaq",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<InfaqAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "pengeluaran",
				element: (
					<AuthGuard roles={["Administrator", "Bendahara DKM"]}>
						<PengeluaranAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "petugas-qurban",
				element: (
					<AuthGuard roles={["Administrator", "Petugas Qurban"]}>
						<PetugasQurbanAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "penerima-qurban",
				element: (
					<AuthGuard roles={["Administrator", "Petugas Qurban"]}>
						<PenerimaQurbanAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "shohibul-qurban",
				element: (
					<AuthGuard roles={["Administrator", "Petugas Qurban"]}>
						<ShohibulQurbanAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "aturan-pembagian",
				element: (
					<AuthGuard roles={["Administrator", "Petugas Qurban"]}>
						<AturanPembagianAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "nasabah-qurban",
				element: (
					<AuthGuard roles={["Administrator", "Petugas Qurban"]}>
						<NasabahQurbanAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "harga-hewan",
				element: (
					<AuthGuard roles={["Administrator", "Petugas Qurban"]}>
						<HargaHewanAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "tabungan-qurban",
				element: (
					<AuthGuard roles={["Administrator", "Petugas Qurban"]}>
						<TabunganQurbanAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "keuangan-qurban",
				element: (
					<AuthGuard roles={["Administrator", "Petugas Qurban"]}>
						<KeuanganQurbanAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "sholat",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<SholatAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "kajian",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<KajianAdminPage />
					</AuthGuard>
				),
			},
			{
				path: "inventory",
				element: (
					<AuthGuard roles={["Administrator"]}>
						<InventoryAdminPage />
					</AuthGuard>
				),
			},
			{ path: "reports", element: <ReportsPage /> },
		],
	},
]);
