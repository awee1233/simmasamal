import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select } from "@/components/ui/form";
import { formatDate, formatIdr } from "@/lib/utils";
import { useResourceList } from "@/hooks/use-resource";

interface Muzakki {
	id: number;
	noMuzakki: string;
	namaMuzakki: string;
}

interface Zakat {
	id: number;
	noZakat: string;
	tanggalZakat: string;
	muzakki: { namaMuzakki: string };
	jenisZakat: string;
	jenisBayar: string;
	jumlahZakat: number;
	beratBeras: number | null;
	status: string;
}

interface ZakatForm {
	petugasPenerima: string;
	noMuzakki: string;
	jenisZakat: "Zakat Fitrah" | "Zakat Mal" | "Zakat Fidyah";
	jenisBayar: "uang" | "beras";
	jumlahZakat: number;
}

export function ZakatAdminPage() {
	const muzakkiList = useResourceList<Muzakki>("muzakki", { limit: 200 });
	return (
		<ResourceAdminPage<Zakat, ZakatForm>
			resource="zakat"
			title="Transaksi Zakat"
			searchable={false}
			columns={[
				{ key: "noZakat", header: "No Zakat" },
				{
					key: "tanggalZakat",
					header: "Tanggal",
					render: (z) => formatDate(z.tanggalZakat),
				},
				{
					key: "muzakki",
					header: "Muzakki",
					render: (z) => z.muzakki?.namaMuzakki ?? "-",
				},
				{ key: "jenisZakat", header: "Jenis" },
				{ key: "jenisBayar", header: "Bayar" },
				{
					key: "jumlahZakat",
					header: "Jumlah",
					render: (z) => formatIdr(z.jumlahZakat),
				},
				{ key: "status", header: "Status" },
			]}
			toFormValues={(row) => ({
				petugasPenerima: "",
				noMuzakki: row?.muzakki ? "" : "",
				jenisZakat:
					(row?.jenisZakat as ZakatForm["jenisZakat"]) ?? "Zakat Fitrah",
				jenisBayar: (row?.jenisBayar as ZakatForm["jenisBayar"]) ?? "uang",
				jumlahZakat: row?.jumlahZakat ?? 0,
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="petugas">Petugas Penerima</Label>
						<Input
							id="petugas"
							{...form.register("petugasPenerima", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="muzakki">Muzakki</Label>
						<Select
							id="muzakki"
							{...form.register("noMuzakki", { required: true })}
						>
							<option value="">Pilih muzakki…</option>
							{(muzakkiList.data?.items ?? []).map((m) => (
								<option key={m.noMuzakki} value={m.noMuzakki}>
									{m.namaMuzakki} ({m.noMuzakki})
								</option>
							))}
						</Select>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jenisZakat">Jenis Zakat</Label>
						<Select
							id="jenisZakat"
							{...form.register("jenisZakat", { required: true })}
						>
							<option value="Zakat Fitrah">Zakat Fitrah</option>
							<option value="Zakat Mal">Zakat Mal</option>
							<option value="Zakat Fidyah">Zakat Fidyah</option>
						</Select>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jenisBayar">Jenis Bayar</Label>
						<Select
							id="jenisBayar"
							{...form.register("jenisBayar", { required: true })}
						>
							<option value="uang">Uang</option>
							<option value="beras">Beras</option>
						</Select>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="jumlahZakat">Jumlah (Rp)</Label>
						<Input
							id="jumlahZakat"
							type="number"
							{...form.register("jumlahZakat", {
								valueAsNumber: true,
								required: true,
							})}
						/>
					</div>
				</div>
			)}
		/>
	);
}
