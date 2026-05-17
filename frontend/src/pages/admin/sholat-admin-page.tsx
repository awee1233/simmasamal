import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label } from "@/components/ui/form";

interface Sholat {
	id: number;
	namaSholat: string;
	waktuSholat: string;
	waktuIqomah: string;
}

interface SholatForm {
	namaSholat: string;
	waktuSholat: string;
	waktuIqomah: string;
}

export function SholatAdminPage() {
	return (
		<ResourceAdminPage<Sholat, SholatForm>
			resource="sholat"
			title="Jadwal Sholat"
			searchable={false}
			columns={[
				{ key: "namaSholat", header: "Nama" },
				{ key: "waktuSholat", header: "Waktu Sholat" },
				{ key: "waktuIqomah", header: "Waktu Iqomah" },
			]}
			toFormValues={(row) => ({
				namaSholat: row?.namaSholat ?? "",
				waktuSholat: row?.waktuSholat ?? "",
				waktuIqomah: row?.waktuIqomah ?? "",
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-3">
					<div className="space-y-1.5 md:col-span-3">
						<Label htmlFor="nama">Nama Sholat</Label>
						<Input
							id="nama"
							{...form.register("namaSholat", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="waktu">Waktu Sholat</Label>
						<Input
							id="waktu"
							type="time"
							{...form.register("waktuSholat", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="iqomah">Waktu Iqomah</Label>
						<Input
							id="iqomah"
							type="time"
							{...form.register("waktuIqomah", { required: true })}
						/>
					</div>
				</div>
			)}
		/>
	);
}
