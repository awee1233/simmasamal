import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select } from "@/components/ui/form";
import { useResourceList } from "@/hooks/use-resource";
import { formatDate, formatIdr } from "@/lib/utils";

interface HargaHewan {
	id: string;
	jenisHewan: string;
	harga: number;
}

interface Nasabah {
	id: string;
	nama: string;
}

interface TabunganQurban {
	id: string;
	nasabah: { nama: string };
	hargaHewan: { jenisHewan: string };
	jumlahSetoran: number;
	tanggalSetor: string;
	status: string;
	metodePembayaran: string | null;
}

interface TabunganForm {
	nasabahId: string;
	hargaHewanId: string;
	jumlahSetoran: number;
	tanggalSetor: string;
	metodePembayaran: string;
	keterangan: string;
}

export function TabunganQurbanAdminPage() {
	const nasabahs = useResourceList<Nasabah>("nasabah-qurban", { limit: 200 });
	const hewans = useResourceList<HargaHewan>("harga-hewan", { limit: 200 });
	return (
		<ResourceAdminPage<TabunganQurban, TabunganForm>
			resource="tabungan-qurban"
			title="Tabungan Qurban"
			searchable={false}
			columns={[
				{
					key: "nasabah",
					header: "Nasabah",
					render: (t) => t.nasabah?.nama ?? "-",
				},
				{
					key: "hargaHewan",
					header: "Target",
					render: (t) => t.hargaHewan?.jenisHewan ?? "-",
				},
				{
					key: "jumlahSetoran",
					header: "Setoran",
					render: (t) => formatIdr(t.jumlahSetoran),
				},
				{
					key: "tanggalSetor",
					header: "Tanggal",
					render: (t) => formatDate(t.tanggalSetor),
				},
				{ key: "metodePembayaran", header: "Metode" },
				{ key: "status", header: "Status" },
			]}
			toFormValues={() => ({
				nasabahId: "",
				hargaHewanId: "",
				jumlahSetoran: 0,
				tanggalSetor: new Date().toISOString().slice(0, 10),
				metodePembayaran: "Tunai",
				keterangan: "",
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="nasabah">Nasabah</Label>
						<Select
							id="nasabah"
							{...form.register("nasabahId", { required: true })}
						>
							<option value="">Pilih nasabah…</option>
							{(nasabahs.data?.items ?? []).map((n) => (
								<option key={n.id} value={n.id}>
									{n.nama}
								</option>
							))}
						</Select>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="hewan">Target Hewan</Label>
						<Select
							id="hewan"
							{...form.register("hargaHewanId", { required: true })}
						>
							<option value="">Pilih target…</option>
							{(hewans.data?.items ?? []).map((h) => (
								<option key={h.id} value={h.id}>
									{h.jenisHewan} · {formatIdr(h.harga)}
								</option>
							))}
						</Select>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jumlah">Setoran</Label>
						<Input
							id="jumlah"
							type="number"
							{...form.register("jumlahSetoran", {
								valueAsNumber: true,
								required: true,
							})}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="tanggal">Tanggal</Label>
						<Input
							id="tanggal"
							type="date"
							{...form.register("tanggalSetor")}
						/>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="metode">Metode</Label>
						<Input id="metode" {...form.register("metodePembayaran")} />
					</div>
				</div>
			)}
		/>
	);
}
