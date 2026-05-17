import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select, Textarea } from "@/components/ui/form";

interface PenerimaQurban {
	id: string;
	nik: string;
	nama: string;
	tahunHijriah: string;
	status: "Personal" | "Yayasan";
	alamat: string;
	rt: string;
	rw: string;
	kategori: string | null;
}

interface PenerimaQurbanForm {
	nik: string;
	nama: string;
	tahunHijriah: string;
	status: "Personal" | "Yayasan";
	alamat: string;
	rt: string;
	rw: string;
	kategori: string;
}

export function PenerimaQurbanAdminPage() {
	return (
		<ResourceAdminPage<PenerimaQurban, PenerimaQurbanForm>
			resource="penerima-qurban"
			title="Penerima Qurban"
			columns={[
				{ key: "nik", header: "NIK" },
				{ key: "nama", header: "Nama" },
				{ key: "tahunHijriah", header: "Tahun" },
				{ key: "status", header: "Status" },
				{ key: "kategori", header: "Kategori" },
			]}
			toFormValues={(row) => ({
				nik: row?.nik ?? "",
				nama: row?.nama ?? "",
				tahunHijriah: row?.tahunHijriah ?? "",
				status: row?.status ?? "Personal",
				alamat: row?.alamat ?? "",
				rt: row?.rt ?? "",
				rw: row?.rw ?? "",
				kategori: row?.kategori ?? "",
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
							<option value="Personal">Personal</option>
							<option value="Yayasan">Yayasan</option>
						</Select>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="rt">RT</Label>
						<Input id="rt" {...form.register("rt")} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="rw">RW</Label>
						<Input id="rw" {...form.register("rw")} />
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="kategori">Kategori</Label>
						<Input id="kategori" {...form.register("kategori")} />
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
