import { useQuery } from "@tanstack/react-query";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type ApiEnvelope, apiClient } from "@/lib/api-client";
import { formatDate, formatIdr } from "@/lib/utils";

interface Sholat {
	id: number;
	namaSholat: string;
	waktuSholat: string;
	waktuIqomah: string;
}

interface Kajian {
	id: number;
	judulKajian: string;
	tanggalKajian: string;
	namaUstad: string | null;
	fotoKajian: string | null;
}

interface Inventory {
	id: number;
	nama: string;
	quantity: number;
	jumlahBaik: number;
}

interface InfaqSummary {
	totalInfaq: number;
}

export function HomePage() {
	const sholat = useQuery({
		queryKey: ["public-sholat"],
		queryFn: async () => {
			const res = await apiClient.get<ApiEnvelope<Sholat[]>>("/sholat");
			return res.data.data;
		},
	});
	const kajian = useQuery({
		queryKey: ["public-kajian"],
		queryFn: async () => {
			const res = await apiClient.get<ApiEnvelope<Kajian[]>>("/kajian", {
				params: { limit: 6 },
			});
			return res.data.data;
		},
	});
	const inventory = useQuery({
		queryKey: ["public-inventory"],
		queryFn: async () => {
			const res = await apiClient.get<ApiEnvelope<Inventory[]>>("/inventory", {
				params: { limit: 6 },
			});
			return res.data.data;
		},
	});
	const infaq = useQuery({
		queryKey: ["public-infaq-summary"],
		queryFn: async () => {
			const res =
				await apiClient.get<ApiEnvelope<InfaqSummary>>("/infaq/summary");
			return res.data.data;
		},
	});

	return (
		<div className="container space-y-8 py-8">
			<section className="grid gap-6 md:grid-cols-3">
				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Assalamu'alaikum</CardTitle>
						<CardDescription>
							Selamat datang di sistem informasi Masjid Khairul Amal.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2 text-sm text-muted-foreground">
						<p>
							Anda dapat berdonasi, membayar zakat, dan mengikuti program qurban
							secara daring melalui halaman ini.
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Saldo Infaq Terkumpul</CardTitle>
						<CardDescription>Hanya mencatat transaksi sukses.</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-semibold">
							{infaq.data ? formatIdr(infaq.data.totalInfaq) : "Rp -"}
						</p>
					</CardContent>
				</Card>
			</section>

			<section>
				<h2 className="mb-3 text-lg font-semibold">Jadwal Sholat Hari Ini</h2>
				<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
					{(sholat.data ?? []).map((s) => (
						<Card key={s.id}>
							<CardHeader>
								<CardTitle className="text-base">{s.namaSholat}</CardTitle>
							</CardHeader>
							<CardContent className="text-sm">
								<p>Adzan: {s.waktuSholat}</p>
								<p className="text-muted-foreground">Iqomah: {s.waktuIqomah}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section>
				<h2 className="mb-3 text-lg font-semibold">Jadwal Kajian</h2>
				<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
					{(kajian.data ?? []).map((k) => (
						<Card key={k.id}>
							{k.fotoKajian ? (
								<img
									src={`/uploads/${k.fotoKajian}`}
									alt={k.judulKajian}
									className="h-40 w-full rounded-t-lg object-cover"
								/>
							) : null}
							<CardHeader>
								<CardTitle className="text-base">{k.judulKajian}</CardTitle>
								<CardDescription>
									{formatDate(k.tanggalKajian)} · {k.namaUstad ?? "-"}
								</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</section>

			<section>
				<h2 className="mb-3 text-lg font-semibold">Inventaris</h2>
				<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
					{(inventory.data ?? []).map((i) => (
						<Card key={i.id}>
							<CardHeader>
								<CardTitle className="text-base">{i.nama}</CardTitle>
								<CardDescription>Jumlah baik: {i.jumlahBaik}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
