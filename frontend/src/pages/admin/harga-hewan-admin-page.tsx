import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label } from "@/components/ui/form";
import { formatIdr } from "@/lib/utils";

interface HargaHewan {
	id: string;
	jenisHewan: string;
	harga: number;
	tahunHijriah: string;
	keterangan: string | null;
}

interface HargaHewanForm {
	jenisHewan: string;
	harga: number;
	tahunHijriah: string;
	keterangan: string;
}

export function HargaHewanAdminPage() {
	return (
		<ResourceAdminPage<HargaHewan, HargaHewanForm>
			resource="harga-hewan"
			title="Harga Hewan Qurban"
			searchable={false}
			columns={[
				{ key: "jenisHewan", header: "Jenis" },
				{ key: "tahunHijriah", header: "Tahun" },
				{ key: "harga", header: "Harga", render: (h) => formatIdr(h.harga) },
				{ key: "keterangan", header: "Keterangan" },
			]}
			toFormValues={(row) => ({
				jenisHewan: row?.jenisHewan ?? "",
				harga: row?.harga ?? 0,
				tahunHijriah: row?.tahunHijriah ?? "",
				keterangan: row?.keterangan ?? "",
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="jenisHewan">Jenis Hewan</Label>
						<Input
							id="jenisHewan"
							{...form.register("jenisHewan", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="tahunHijriah">Tahun Hijriah</Label>
						<Input
							id="tahunHijriah"
							{...form.register("tahunHijriah", { required: true })}
						/>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="harga">Harga</Label>
						<Input
							id="harga"
							type="number"
							{...form.register("harga", { valueAsNumber: true })}
						/>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="keterangan">Keterangan</Label>
						<Input id="keterangan" {...form.register("keterangan")} />
					</div>
				</div>
			)}
		/>
	);
}
