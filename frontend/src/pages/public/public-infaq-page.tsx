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

declare global {
	interface Window {
		snap?: {
			pay: (
				token: string,
				options?: {
					onSuccess?: (result: unknown) => void;
					onPending?: (result: unknown) => void;
					onError?: (result: unknown) => void;
					onClose?: () => void;
				},
			) => void;
		};
	}
}

interface Donatur {
	id: number;
	nama: string;
}

interface Infaq {
	id: number;
	noPenerimaan: string;
}

interface PublicInfaqForm {
	nama: string;
	noTelepon: string;
	email: string;
	anonim: "ya" | "tidak";
	pesanDoa: string;
	jenisPenerimaan: string;
	jumlah: number;
}

export function PublicInfaqPage() {
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<PublicInfaqForm>({
		defaultValues: {
			nama: "",
			noTelepon: "",
			email: "",
			anonim: "tidak",
			pesanDoa: "",
			jenisPenerimaan: "Infaq",
			jumlah: 50000,
		},
	});

	async function handleSubmit(values: PublicInfaqForm) {
		setStatus("submitting");
		setMessage(null);
		try {
			const donaturRes = await apiClient.post<ApiEnvelope<Donatur>>(
				"/donatur",
				{
					nama: values.nama,
					noTelepon: values.noTelepon,
					email: values.email || null,
					anonim: values.anonim,
					pesanDoa: values.pesanDoa || null,
				},
			);
			const donatur = donaturRes.data.data;
			const infaqRes = await apiClient.post<ApiEnvelope<Infaq>>("/infaq", {
				donaturId: donatur.id,
				jenisPenerimaan: values.jenisPenerimaan,
				jumlah: values.jumlah,
			});
			const infaq = infaqRes.data.data;
			const snapRes = await apiClient.post<
				ApiEnvelope<{ token: string; redirectUrl: string }>
			>("/payment/infaq/create", { infaqId: infaq.id });
			const { token, redirectUrl } = snapRes.data.data;
			if (window.snap?.pay) {
				window.snap.pay(token, {
					onSuccess: () => {
						setStatus("success");
						setMessage("Pembayaran berhasil. Terima kasih!");
					},
					onPending: () => {
						setStatus("success");
						setMessage("Pembayaran sedang diproses.");
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
					?.message ?? "Terjadi kesalahan saat mengirim donasi.",
			);
		}
	}

	return (
		<div className="container py-8">
			<Card className="mx-auto max-w-2xl">
				<CardHeader>
					<CardTitle>Donasi Infaq</CardTitle>
					<CardDescription>
						Setiap donasi Anda akan disalurkan untuk kemaslahatan umat.
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
									{...form.register("nama", { required: true })}
								/>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="telp">Nomor HP</Label>
								<Input
									id="telp"
									{...form.register("noTelepon", { required: true })}
								/>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" {...form.register("email")} />
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="anonim">Tampilkan nama?</Label>
								<Select id="anonim" {...form.register("anonim")}>
									<option value="tidak">Tampilkan</option>
									<option value="ya">Anonim</option>
								</Select>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="jenis">Jenis</Label>
								<Select id="jenis" {...form.register("jenisPenerimaan")}>
									<option>Infaq</option>
									<option>Donasi Pembangunan</option>
									<option>Donasi Ramadhan</option>
								</Select>
							</div>
							<div className="space-y-1.5 md:col-span-2">
								<Label htmlFor="jumlah">Jumlah (Rp)</Label>
								<Input
									id="jumlah"
									type="number"
									min={10000}
									{...form.register("jumlah", {
										valueAsNumber: true,
										required: true,
									})}
								/>
							</div>
							<div className="space-y-1.5 md:col-span-2">
								<Label htmlFor="pesan">Pesan / Doa</Label>
								<Textarea id="pesan" {...form.register("pesanDoa")} />
							</div>
						</div>
						{message ? (
							<p
								className={
									status === "error"
										? "text-sm text-destructive"
										: "text-sm text-primary"
								}
								role="status"
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
