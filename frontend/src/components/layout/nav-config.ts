import type { Jabatan } from "@/types";

export interface NavItem {
	label: string;
	to: string;
	roles: Jabatan[];
}

export interface NavGroup {
	label: string;
	items: NavItem[];
}

const ALL_ADMIN: Jabatan[] = [
	"Administrator",
	"Bendahara DKM",
	"Petugas Qurban",
];

export const adminNavGroups: NavGroup[] = [
	{
		label: "Dashboard",
		items: [{ label: "Ringkasan", to: "/admin", roles: ALL_ADMIN }],
	},
	{
		label: "Data Master",
		items: [
			{ label: "Donatur", to: "/admin/donatur", roles: ["Administrator"] },
			{ label: "Muzakki", to: "/admin/muzakki", roles: ["Administrator"] },
			{ label: "Mustahik", to: "/admin/mustahik", roles: ["Administrator"] },
			{
				label: "Petugas",
				to: "/admin/users",
				roles: ["Administrator"],
			},
		],
	},
	{
		label: "Zakat",
		items: [
			{
				label: "Transaksi Zakat",
				to: "/admin/zakat",
				roles: ["Administrator"],
			},
			{
				label: "Penyaluran",
				to: "/admin/penyaluran",
				roles: ["Administrator", "Bendahara DKM"],
			},
		],
	},
	{
		label: "Infaq",
		items: [
			{
				label: "Penerimaan Infaq",
				to: "/admin/infaq",
				roles: ["Administrator"],
			},
			{
				label: "Pengeluaran",
				to: "/admin/pengeluaran",
				roles: ["Administrator", "Bendahara DKM"],
			},
		],
	},
	{
		label: "Qurban",
		items: [
			{
				label: "Petugas Qurban",
				to: "/admin/petugas-qurban",
				roles: ["Administrator", "Petugas Qurban"],
			},
			{
				label: "Penerima Qurban",
				to: "/admin/penerima-qurban",
				roles: ["Administrator", "Petugas Qurban"],
			},
			{
				label: "Shohibul Qurban",
				to: "/admin/shohibul-qurban",
				roles: ["Administrator", "Petugas Qurban"],
			},
			{
				label: "Aturan Pembagian",
				to: "/admin/aturan-pembagian",
				roles: ["Administrator", "Petugas Qurban"],
			},
			{
				label: "Nasabah Qurban",
				to: "/admin/nasabah-qurban",
				roles: ["Administrator", "Petugas Qurban"],
			},
			{
				label: "Harga Hewan",
				to: "/admin/harga-hewan",
				roles: ["Administrator", "Petugas Qurban"],
			},
			{
				label: "Tabungan Qurban",
				to: "/admin/tabungan-qurban",
				roles: ["Administrator", "Petugas Qurban"],
			},
			{
				label: "Keuangan Qurban",
				to: "/admin/keuangan-qurban",
				roles: ["Administrator", "Petugas Qurban"],
			},
		],
	},
	{
		label: "Informasi Publik",
		items: [
			{ label: "Jadwal Sholat", to: "/admin/sholat", roles: ["Administrator"] },
			{ label: "Kajian", to: "/admin/kajian", roles: ["Administrator"] },
			{ label: "Inventaris", to: "/admin/inventory", roles: ["Administrator"] },
		],
	},
	{
		label: "Laporan",
		items: [
			{
				label: "Export Laporan",
				to: "/admin/reports",
				roles: ["Administrator", "Bendahara DKM", "Petugas Qurban"],
			},
		],
	},
];

export function filterNav(groups: NavGroup[], jabatan: Jabatan): NavGroup[] {
	return groups
		.map((g) => ({
			...g,
			items: g.items.filter((item) => item.roles.includes(jabatan)),
		}))
		.filter((g) => g.items.length > 0);
}
