import { useQuery } from "@tanstack/react-query";
import { type ApiEnvelope, apiClient } from "@/lib/api-client";
import { PageHeader } from "@/components/shared/page-header";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatIdr } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

interface ZakatSummary {
	byJenisZakat: {
		jenisZakat: string;
		totalZakat: number;
		totalBeras: number;
		totalPenyaluran: number;
		berasDisalurkan: number;
		saldo: number;
		beratBerasSaldo: number;
	}[];
	totalSaldo: number;
	totalBerasSaldo: number;
}

interface InfaqSummary {
	totalInfaq: number;
	totalPengeluaran: number;
	saldo: number;
}

interface KeuanganQurbanSummary {
	pemasukan: number;
	pengeluaran: number;
	saldo: number;
}

export function DashboardPage() {
	const { user } = useAuth();
	const isAdmin = user?.jabatan === "Administrator";
	const isBendahara = user?.jabatan === "Bendahara DKM";
	const isPetugasQ = user?.jabatan === "Petugas Qurban";

	const zakatSummary = useQuery({
		queryKey: ["zakat", "summary"],
		enabled: isAdmin || isBendahara,
		queryFn: async () => {
			const res =
				await apiClient.get<ApiEnvelope<ZakatSummary>>("/zakat/summary");
			return res.data.data;
		},
	});

	const infaqSummary = useQuery({
		queryKey: ["infaq", "summary"],
		enabled: isAdmin || isBendahara,
		queryFn: async () => {
			const res =
				await apiClient.get<ApiEnvelope<InfaqSummary>>("/infaq/summary");
			return res.data.data;
		},
	});

	const keuanganQurban = useQuery({
		queryKey: ["keuangan-qurban", "summary"],
		enabled: isAdmin || isPetugasQ,
		queryFn: async () => {
			const res = await apiClient.get<ApiEnvelope<KeuanganQurbanSummary>>(
				"/keuangan-qurban/summary",
			);
			return res.data.data;
		},
	});

	return (
		<div>
			<PageHeader
				title={`Selamat datang, ${user?.name ?? "Pengguna"}`}
				description="Ringkasan keuangan dan operasional masjid."
			/>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{infaqSummary.data ? (
					<Card>
						<CardHeader>
							<CardTitle>Saldo Infaq</CardTitle>
							<CardDescription>
								Infaq terverifikasi minus pengeluaran
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-1">
							<p className="text-2xl font-semibold">
								{formatIdr(infaqSummary.data.saldo)}
							</p>
							<p className="text-xs text-muted-foreground">
								Total infaq: {formatIdr(infaqSummary.data.totalInfaq)} ·
								Pengeluaran: {formatIdr(infaqSummary.data.totalPengeluaran)}
							</p>
						</CardContent>
					</Card>
				) : null}

				{zakatSummary.data ? (
					<Card>
						<CardHeader>
							<CardTitle>Saldo Zakat</CardTitle>
							<CardDescription>
								Akumulasi zakat setelah penyaluran
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-1">
							<p className="text-2xl font-semibold">
								{formatIdr(zakatSummary.data.totalSaldo)}
							</p>
							<p className="text-xs text-muted-foreground">
								Saldo beras: {zakatSummary.data.totalBerasSaldo.toFixed(2)} kg
							</p>
						</CardContent>
					</Card>
				) : null}

				{keuanganQurban.data ? (
					<Card>
						<CardHeader>
							<CardTitle>Saldo Qurban</CardTitle>
							<CardDescription>
								Pemasukan minus pengeluaran qurban
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-1">
							<p className="text-2xl font-semibold">
								{formatIdr(keuanganQurban.data.saldo)}
							</p>
							<p className="text-xs text-muted-foreground">
								Masuk: {formatIdr(keuanganQurban.data.pemasukan)} · Keluar:{" "}
								{formatIdr(keuanganQurban.data.pengeluaran)}
							</p>
						</CardContent>
					</Card>
				) : null}
			</div>
		</div>
	);
}
