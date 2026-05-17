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
import { Input, Label, Select } from "@/components/ui/form";
import { type ApiEnvelope, apiClient } from "@/lib/api-client";

interface Muzakki {
	id: number;
	noMuzakki: string;
}

interface Zakat {
	id: number;
	noZakat: string;
}

interface PublicZakatForm {
	namaMuzakki: string;
	telpMuzakki: string;
	alamatMuzakki: string;
	jenisZakat: "Zakat Fitrah" | "Zakat Mal" | "Zakat Fidyah";
	jumlahZakat: number;
}

export function PublicZakatPage() {
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<PublicZakatForm>({
		defaultValues: {
			namaMuzakki: "",
			telpMuzakki: "",
			alamatMuzakki: "",
			jenisZakat: "Zakat Fitrah",
			jumlahZakat: 50000,
		},
	});

	async function handleSubmit(values: PublicZakatForm) {
		setStatus("submitting");
		setMessage(null);
		try {
			const muzakkiRes = await apiClient.post<ApiEnvelope<Muzakki>>(
				"/muzakki",
				{
					namaMuzakki: values.namaMuzakki,
					telpMuzakki: values.telpMuzakki,
					alamatMuzakki: values.alamatMuzakki,
				},
			);
			const zakatRes = await apiClient.post<ApiEnvelope<Zakat>>("/zakat", {
				petugasPenerima: "Online",
				noMuzakki: muzakkiRes.data.data.noMuzakki,
				jenisZakat: values.jenisZakat,
				jenisBayar: "uang",
				jumlahZakat: values.jumlahZakat,
				status: "pending",
			});
			const snapRes = await apiClient.post<
				ApiEnvelope<{ token: string; redirectUrl: string }>
			>("/payment/zakat/create", { zakatId: zakatRes.data.data.id });
			const { token, redirectUrl } = snapRes.data.data;
			if (window.snap?.pay) {
				window.snap.pay(token, {
					onSuccess: () => {
						setStatus("success");
						setMessage("Zakat diterima. Jazakallahu khair.");
					},
					onError: () => {
						setStatus("error");
						setMessage("Pembayaran zakat gagal diproses.");
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
		<div className="container py-8">
			<Card className="mx-auto max-w-2xl">
				<CardHeader>
					<CardTitle>Bayar Zakat Online</CardTitle>
					<CardDescription>
						Tunaikan zakat Anda dengan aman via Midtrans.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<div className="grid gap-3 md:grid-cols-2">
							<div className="space-y-1.5 md:col-span-2">
								<Label htmlFor="nama">Nama</Label>
								<Input
									id="nama"
									{...form.register("namaMuzakki", { required: true })}
								/>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="telp">Nomor HP</Label>
								<Input
									id="telp"
									{...form.register("telpMuzakki", { required: true })}
								/>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="jenis">Jenis Zakat</Label>
								<Select id="jenis" {...form.register("jenisZakat")}>
									<option value="Zakat Fitrah">Zakat Fitrah</option>
									<option value="Zakat Mal">Zakat Mal</option>
									<option value="Zakat Fidyah">Zakat Fidyah</option>
								</Select>
							</div>
							<div className="space-y-1.5 md:col-span-2">
								<Label htmlFor="alamat">Alamat</Label>
								<Input
									id="alamat"
									{...form.register("alamatMuzakki", { required: true })}
								/>
							</div>
							<div className="space-y-1.5 md:col-span-2">
								<Label htmlFor="jumlah">Jumlah (Rp)</Label>
								<Input
									id="jumlah"
									type="number"
									min={10000}
									{...form.register("jumlahZakat", {
										valueAsNumber: true,
										required: true,
									})}
								/>
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
