import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select, Textarea } from "@/components/ui/form";

interface Donatur {
	id: number;
	noDonatur: string;
	nama: string;
	noTelepon: string;
	email: string | null;
	anonim: string;
}

interface DonaturForm {
	nama: string;
	noTelepon: string;
	email: string;
	pekerjaan: string;
	alamat: string;
	anonim: "ya" | "tidak";
	pesanDoa: string;
}

export function DonaturAdminPage() {
	return (
		<ResourceAdminPage<Donatur, DonaturForm>
			resource="donatur"
			title="Donatur"
			columns={[
				{ key: "noDonatur", header: "No" },
				{ key: "nama", header: "Nama" },
				{ key: "noTelepon", header: "Telepon" },
				{
					key: "anonim",
					header: "Status",
					render: (d) => (d.anonim === "ya" ? "Anonim" : "Publik"),
				},
			]}
			toFormValues={(row) => ({
				nama: row?.nama ?? "",
				noTelepon: row?.noTelepon ?? "",
				email: row?.email ?? "",
				pekerjaan: "",
				alamat: "",
				anonim: (row?.anonim ?? "tidak") as "ya" | "tidak",
				pesanDoa: "",
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="nama">Nama</Label>
						<Input id="nama" {...form.register("nama", { required: true })} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="telp">Telepon</Label>
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
						<Label htmlFor="pekerjaan">Pekerjaan</Label>
						<Input id="pekerjaan" {...form.register("pekerjaan")} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="anonim">Status</Label>
						<Select id="anonim" {...form.register("anonim")}>
							<option value="tidak">Publik</option>
							<option value="ya">Anonim</option>
						</Select>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="alamat">Alamat</Label>
						<Textarea id="alamat" {...form.register("alamat")} />
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="pesanDoa">Pesan Doa</Label>
						<Textarea id="pesanDoa" {...form.register("pesanDoa")} />
					</div>
				</div>
			)}
		/>
	);
}
