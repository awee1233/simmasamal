import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select } from "@/components/ui/form";

interface PetugasQurban {
	id: string;
	nik: string;
	nama: string;
	tahunHijriah: string;
	status: "Petugas DKM" | "Warga" | "Penyembelih" | "Lainnya";
}

interface PetugasQurbanForm {
	nik: string;
	nama: string;
	tahunHijriah: string;
	status: "Petugas DKM" | "Warga" | "Penyembelih" | "Lainnya";
}

export function PetugasQurbanAdminPage() {
	return (
		<ResourceAdminPage<PetugasQurban, PetugasQurbanForm>
			resource="petugas-qurban"
			title="Petugas Qurban"
			columns={[
				{ key: "nik", header: "NIK" },
				{ key: "nama", header: "Nama" },
				{ key: "tahunHijriah", header: "Tahun" },
				{ key: "status", header: "Status" },
			]}
			toFormValues={(row) => ({
				nik: row?.nik ?? "",
				nama: row?.nama ?? "",
				tahunHijriah: row?.tahunHijriah ?? "",
				status: row?.status ?? "Petugas DKM",
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
						<Label htmlFor="tahunHijriah">Tahun Hijriah</Label>
						<Input
							id="tahunHijriah"
							{...form.register("tahunHijriah", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="status">Status</Label>
						<Select
							id="status"
							{...form.register("status", { required: true })}
						>
							<option value="Petugas DKM">Petugas DKM</option>
							<option value="Warga">Warga</option>
							<option value="Penyembelih">Penyembelih</option>
							<option value="Lainnya">Lainnya</option>
						</Select>
					</div>
				</div>
			)}
		/>
	);
}
