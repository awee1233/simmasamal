import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { useResourceList } from "@/hooks/use-resource";
import { formatIdr } from "@/lib/utils";

interface HargaHewan {
	id: string;
	jenisHewan: string;
	harga: number;
	tahunHijriah: string;
}

interface NasabahQurban {
	id: string;
	nik: string;
	nama: string;
	hp: string;
	alamat: string;
	refId: string;
	totalTabungan: number;
	sisaTabungan: number;
	targetHewan?: HargaHewan | null;
}

interface NasabahQurbanForm {
	nik: string;
	nama: string;
	hp: string;
	alamat: string;
	targetHewanId: string;
}

export function NasabahQurbanAdminPage() {
	const hewanList = useResourceList<HargaHewan>("harga-hewan", { limit: 200 });
	return (
		<ResourceAdminPage<NasabahQurban, NasabahQurbanForm>
			resource="nasabah-qurban"
			title="Nasabah Qurban"
			columns={[
				{ key: "refId", header: "Ref" },
				{ key: "nama", header: "Nama" },
				{ key: "hp", header: "HP" },
				{
					key: "target",
					header: "Target",
					render: (n) => n.targetHewan?.jenisHewan ?? "-",
				},
				{
					key: "totalTabungan",
					header: "Tabungan",
					render: (n) => formatIdr(n.totalTabungan),
				},
			]}
			toFormValues={(row) => ({
				nik: row?.nik ?? "",
				nama: row?.nama ?? "",
				hp: row?.hp ?? "",
				alamat: row?.alamat ?? "",
				targetHewanId: row?.targetHewan?.id ?? "",
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="nik">NIK</Label>
						<Input id="nik" {...form.register("nik", { required: true })} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="nama">Nama</Label>
						<Input id="nama" {...form.register("nama", { required: true })} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="hp">HP</Label>
						<Input id="hp" {...form.register("hp", { required: true })} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="target">Target Hewan</Label>
						<Select id="target" {...form.register("targetHewanId")}>
							<option value="">-- Belum memilih --</option>
							{(hewanList.data?.items ?? []).map((h) => (
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
				</div>
			)}
		/>
	);
}
