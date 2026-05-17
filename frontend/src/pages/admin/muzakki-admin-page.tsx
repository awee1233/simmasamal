import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Textarea } from "@/components/ui/form";

interface Muzakki {
	id: number;
	noMuzakki: string;
	namaMuzakki: string;
	telpMuzakki: string;
	alamatMuzakki: string;
	tanggalInput: string;
}

interface MuzakkiForm {
	namaMuzakki: string;
	telpMuzakki: string;
	alamatMuzakki: string;
}

export function MuzakkiAdminPage() {
	return (
		<ResourceAdminPage<Muzakki, MuzakkiForm>
			resource="muzakki"
			title="Muzakki"
			description="Data pembayar zakat."
			columns={[
				{ key: "noMuzakki", header: "No" },
				{ key: "namaMuzakki", header: "Nama" },
				{ key: "telpMuzakki", header: "Telepon" },
				{ key: "alamatMuzakki", header: "Alamat" },
			]}
			searchPlaceholder="Cari nama atau nomor muzakki…"
			toFormValues={(row) => ({
				namaMuzakki: row?.namaMuzakki ?? "",
				telpMuzakki: row?.telpMuzakki ?? "",
				alamatMuzakki: row?.alamatMuzakki ?? "",
			})}
			renderForm={(form) => (
				<div className="grid gap-3">
					<div className="space-y-1.5">
						<Label htmlFor="nama">Nama</Label>
						<Input
							id="nama"
							{...form.register("namaMuzakki", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="telp">Telepon</Label>
						<Input
							id="telp"
							{...form.register("telpMuzakki", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="alamat">Alamat</Label>
						<Textarea
							id="alamat"
							{...form.register("alamatMuzakki", { required: true })}
						/>
					</div>
				</div>
			)}
		/>
	);
}
