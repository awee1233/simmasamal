import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { formatDate, formatIdr } from "@/lib/utils";

interface KeuanganQurban {
	id: string;
	noTransaksi: string;
	tanggal: string;
	jenis: "Masuk" | "Keluar" | "Beli Hewan Qurban";
	jumlah: number;
	keterangan: string | null;
}

interface KeuanganQurbanForm {
	tanggal: string;
	jenis: "Masuk" | "Keluar" | "Beli Hewan Qurban";
	jumlah: number;
	keterangan: string;
}

export function KeuanganQurbanAdminPage() {
	return (
		<ResourceAdminPage<KeuanganQurban, KeuanganQurbanForm>
			resource="keuangan-qurban"
			title="Keuangan Qurban"
			searchable={false}
			columns={[
				{ key: "noTransaksi", header: "No" },
				{
					key: "tanggal",
					header: "Tanggal",
					render: (k) => formatDate(k.tanggal),
				},
				{ key: "jenis", header: "Jenis" },
				{ key: "jumlah", header: "Jumlah", render: (k) => formatIdr(k.jumlah) },
				{ key: "keterangan", header: "Keterangan" },
			]}
			toFormValues={(row) => ({
				tanggal:
					row?.tanggal?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
				jenis: row?.jenis ?? "Masuk",
				jumlah: row?.jumlah ?? 0,
				keterangan: row?.keterangan ?? "",
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="tanggal">Tanggal</Label>
						<Input
							id="tanggal"
							type="date"
							{...form.register("tanggal", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jenis">Jenis</Label>
						<Select id="jenis" {...form.register("jenis", { required: true })}>
							<option value="Masuk">Masuk</option>
							<option value="Keluar">Keluar</option>
							<option value="Beli Hewan Qurban">Beli Hewan Qurban</option>
						</Select>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="jumlah">Jumlah</Label>
						<Input
							id="jumlah"
							type="number"
							{...form.register("jumlah", {
								valueAsNumber: true,
								required: true,
							})}
						/>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="keterangan">Keterangan</Label>
						<Textarea id="keterangan" {...form.register("keterangan")} />
					</div>
				</div>
			)}
		/>
	);
}
