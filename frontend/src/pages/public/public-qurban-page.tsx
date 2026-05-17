import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { type ApiEnvelope, apiClient } from "@/lib/api-client";
import { formatIdr } from "@/lib/utils";

interface HargaHewan {
	id: string;
	jenisHewan: string;
	harga: number;
	tahunHijriah: string;
}

interface Nasabah {
	id: string;
}

interface Tabungan {
	id: string;
}

interface PublicQurbanForm {
	nik: string;
	nama: string;
	hp: string;
	alamat: string;
	hargaHewanId: string;
	jumlahSetoran: number;
	keterangan: string;
}

export function PublicQurbanPage() {
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState<string | null>(null);
	const hewans = useQuery({
		queryKey: ["public-harga-hewan"],
		queryFn: async () => {
			const res = await apiClient.get<ApiEnvelope<HargaHewan[]>>(
				"/harga-hewan",
				{ params: { limit: 100 } },
			);
			return res.data.data;
		},
	});
	const form = useForm<PublicQurbanForm>({
		defaultValues: {
			nik: "",
			nama: "",
			hp: "",
			alamat: "",
			hargaHewanId: "",
			jumlahSetoran: 100000,
			keterangan: "",
		},
	});

	async function handleSubmit(values: PublicQurbanForm) {
		setStatus("submitting");
		setMessage(null);
		try {
			const nasabahRes = await apiClient.post<ApiEnvelope<Nasabah>>(
				"/nasabah-qurban",
				{
					nik: values.nik,
					nama: values.nama,
					hp: values.hp,
					alamat: values.alamat,
					targetHewanId: values.hargaHewanId,
				},
			);
			const tabunganRes = await apiClient.post<ApiEnvelope<Tabungan>>(
				"/tabungan-qurban",
				{
					nasabahId: nasabahRes.data.data.id,
					hargaHewanId: values.hargaHewanId,
					jumlahSetoran: values.jumlahSetoran,
					keterangan: values.keterangan,
					metodePembayaran: "Midtrans",
				},
			);
			const snapRes = await apiClient.post<
				ApiEnvelope<{ token: string; redirectUrl: string }>
			>("/payment/tabungan/create", {
				tabunganId: tabunganRes.data.data.id,
			});
			const { token, redirectUrl } = snapRes.data.data;
			if (window.snap?.pay) {
				window.snap.pay(token, {
					onSuccess: () => {
						setStatus("success");
						setMessage("Setoran diterima, semoga Allah menerimanya.");
					},
					onError: () => {
						setStatus("error");
						setMessage("Pembayaran gagal diproses.");
					},
				});
			} else if (redirectUrl) {
				window.location.href = redirectUrl;
			}
		} catch (err) {
			setStatus("error");
			setMessage(
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message ?? "Terjadi kesalahan.",
			);
		}
	}

	return (
		<div className="container space-y-6 py-8">
			<section>
				<h2 className="mb-3 text-lg font-semibold">Harga Hewan Qurban</h2>
				<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
					{(hewans.data ?? []).map((h) => (
						<Card key={h.id}>
							<CardHeader>
								<CardTitle>{h.jenisHewan}</CardTitle>
								<CardDescription>{h.tahunHijriah} H</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-xl font-semibold">{formatIdr(h.harga)}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<Card>
				<CardHeader>
					<CardTitle>Tabungan Qurban</CardTitle>
					<CardDescription>
						Menabung untuk berqurban dengan cicilan.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<div className="grid gap-3 md:grid-cols-2">
							<div className="space-y-1.5">
								<Label htmlFor="nik">NIK</Label>
								<Input id="nik" {...form.register("nik", { required: true })} />
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="nama">Nama</Label>
								<Input
									id="nama"
									{...form.register("nama", { required: true })}
								/>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="hp">Nomor HP</Label>
								<Input id="hp" {...form.register("hp", { required: true })} />
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="target">Target Hewan</Label>
								<Select
									id="target"
									{...form.register("hargaHewanId", { required: true })}
								>
									<option value="">Pilih hewan…</option>
									{(hewans.data ?? []).map((h) => (
										<option key={h.id} value={h.id}>
											{h.jenisHewan} · {formatIdr(h.harga)}
										</option>
									))}
								</Select>
							</div>
							<div className="space-y-1.5 md:col-span-2">
								<Label htmlFor="alamat">Alamat</Label>
								<Textarea
									id="alamat"
									{...form.register("alamat", { required: true })}
								/>
							</div>
							<div className="space-y-1.5 md:col-span-2">
								<Label htmlFor="jumlah">Jumlah Setoran (Rp)</Label>
								<Input
									id="jumlah"
									type="number"
									min={50000}
									{...form.register("jumlahSetoran", {
										valueAsNumber: true,
										required: true,
									})}
								/>
							</div>
							<div className="space-y-1.5 md:col-span-2">
								<Label htmlFor="keterangan">Keterangan</Label>
								<Input id="keterangan" {...form.register("keterangan")} />
							</div>
						</div>
						{message ? (
							<p
								className={
									status === "error"
										? "text-sm text-destructive"
										: "text-sm text-primary"
								}
							>
								{message}
							</p>
						) : null}
						<Button
							type="submit"
							className="w-full"
							disabled={status === "submitting"}
						>
							{status === "submitting" ? "Memproses…" : "Lanjut ke Pembayaran"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
