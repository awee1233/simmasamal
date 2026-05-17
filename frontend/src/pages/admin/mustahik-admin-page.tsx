import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Textarea } from "@/components/ui/form";

interface Mustahik {
	id: number;
	noMustahik: string;
	noKk: string;
	namaMustahik: string;
	alamatMustahik: string;
	asnaf: string;
	rt: string;
	jumlahAnak: number;
}

interface MustahikForm {
	noKk: string;
	namaMustahik: string;
	alamatMustahik: string;
	asnaf: string;
	rt: string;
	jumlahAnak: number;
}

export function MustahikAdminPage() {
	return (
		<ResourceAdminPage<Mustahik, MustahikForm>
			resource="mustahik"
			title="Mustahik"
			description="Data penerima zakat."
			columns={[
				{ key: "noMustahik", header: "No" },
				{ key: "namaMustahik", header: "Nama" },
				{ key: "asnaf", header: "Asnaf" },
				{ key: "rt", header: "RT" },
				{ key: "jumlahAnak", header: "Anak" },
			]}
			searchPlaceholder="Cari nama/no KK mustahik…"
			toFormValues={(row) => ({
				noKk: row?.noKk ?? "",
				namaMustahik: row?.namaMustahik ?? "",
				alamatMustahik: row?.alamatMustahik ?? "",
				asnaf: row?.asnaf ?? "",
				rt: row?.rt ?? "",
				jumlahAnak: row?.jumlahAnak ?? 0,
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="noKk">No KK</Label>
						<Input id="noKk" {...form.register("noKk", { required: true })} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="nama">Nama</Label>
						<Input
							id="nama"
							{...form.register("namaMustahik", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="asnaf">Asnaf</Label>
						<Input id="asnaf" {...form.register("asnaf", { required: true })} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="rt">RT</Label>
						<Input id="rt" {...form.register("rt", { required: true })} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jumlahAnak">Jumlah Anak</Label>
						<Input
							id="jumlahAnak"
							type="number"
							{...form.register("jumlahAnak", { valueAsNumber: true })}
						/>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="alamat">Alamat</Label>
						<Textarea
							id="alamat"
							{...form.register("alamatMustahik", { required: true })}
						/>
					</div>
				</div>
			)}
		/>
	);
}
