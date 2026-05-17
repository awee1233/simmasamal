import { Download } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/form";
import { apiClient } from "@/lib/api-client";

interface ReportFilter {
	from: string;
	to: string;
	format: "pdf" | "excel";
	tahunHijriah: string;
	jenisHewan: string;
}

const defaultFilter: ReportFilter = {
	from: "",
	to: "",
	format: "pdf",
	tahunHijriah: "",
	jenisHewan: "",
};

async function downloadReport(path: string, filters: Record<string, string>) {
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(filters)) {
		if (value) params.append(key, value);
	}
	const res = await apiClient.get(`${path}?${params.toString()}`, {
		responseType: "blob",
	});
	const blob = new Blob([res.data]);
	const url = URL.createObjectURL(blob);
	const disposition = (res.headers as Record<string, string>)[
		"content-disposition"
	];
	const filenameMatch = disposition?.match(/filename="([^"]+)"/);
	const filename = filenameMatch?.[1] ?? "laporan";
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

export function ReportsPage() {
	const [filter, setFilter] = useState<ReportFilter>(defaultFilter);

	return (
		<div>
			<PageHeader
				title="Laporan"
				description="Ekspor laporan keuangan dan qurban."
			/>
			<Card className="mb-4">
				<CardHeader>
					<CardTitle>Filter</CardTitle>
					<CardDescription>
						Rentang tanggal dan kategori qurban.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-3 md:grid-cols-4">
					<div className="space-y-1.5">
						<Label htmlFor="from">Dari</Label>
						<Input
							id="from"
							type="date"
							value={filter.from}
							onChange={(e) =>
								setFilter((f) => ({ ...f, from: e.target.value }))
							}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="to">Sampai</Label>
						<Input
							id="to"
							type="date"
							value={filter.to}
							onChange={(e) => setFilter((f) => ({ ...f, to: e.target.value }))}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="format">Format</Label>
						<Select
							id="format"
							value={filter.format}
							onChange={(e) =>
								setFilter((f) => ({
									...f,
									format: e.target.value as "pdf" | "excel",
								}))
							}
						>
							<option value="pdf">PDF</option>
							<option value="excel">Excel</option>
						</Select>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="tahun">Tahun Hijriah (Qurban)</Label>
						<Input
							id="tahun"
							value={filter.tahunHijriah}
							onChange={(e) =>
								setFilter((f) => ({ ...f, tahunHijriah: e.target.value }))
							}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
				<ReportCard
					title="Laporan Zakat"
					description="Rekap zakat per rentang tanggal."
					onDownload={() =>
						downloadReport("/reports/zakat", {
							from: filter.from,
							to: filter.to,
							format: filter.format,
						})
					}
				/>
				<ReportCard
					title="Laporan Infaq"
					description="Hanya transaksi sukses."
					onDownload={() =>
						downloadReport("/reports/infaq", {
							from: filter.from,
							to: filter.to,
							format: filter.format,
						})
					}
				/>
				<ReportCard
					title="Laporan Pengeluaran"
					description="Pengeluaran masjid per rentang."
					onDownload={() =>
						downloadReport("/reports/pengeluaran", {
							from: filter.from,
							to: filter.to,
							format: filter.format,
						})
					}
				/>
				<ReportCard
					title="Shohibul Qurban"
					description="Laporan peserta qurban tahun berjalan."
					onDownload={() =>
						downloadReport("/reports/shohibul-qurban", {
							tahun_hijriah: filter.tahunHijriah,
							jenis_hewan: filter.jenisHewan,
						})
					}
				/>
				<ReportCard
					title="Keuangan Qurban"
					description="Pemasukan & pengeluaran qurban (Excel)."
					onDownload={() =>
						downloadReport("/reports/keuangan-qurban", {
							from: filter.from,
							to: filter.to,
						})
					}
				/>
				<ReportCard
					title="Nametag Qurban"
					description="PDF nametag shohibul qurban."
					onDownload={() =>
						downloadReport("/reports/nametag-qurban", {
							tahun_hijriah: filter.tahunHijriah,
							jenis_hewan: filter.jenisHewan,
						})
					}
				/>
			</div>
		</div>
	);
}

function ReportCard({
	title,
	description,
	onDownload,
}: {
	title: string;
	description: string;
	onDownload: () => Promise<void> | void;
}) {
	const [loading, setLoading] = useState(false);
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					disabled={loading}
					onClick={async () => {
						setLoading(true);
						try {
							await onDownload();
						} finally {
							setLoading(false);
						}
					}}
				>
					<Download className="h-4 w-4" /> Unduh
				</Button>
			</CardContent>
		</Card>
	);
}
