import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Textarea } from "@/components/ui/form";
import { formatDate, formatIdr } from "@/lib/utils";

interface Pengeluaran {
	id: number;
	noPengajuan: string;
	tanggal: string;
	namaKoordinator: string;
	koordinatorBidang: string;
	jenisPengeluaran: string;
	jumlah: number;
}

interface PengeluaranForm {
	tanggal: string;
	namaKoordinator: string;
	koordinatorBidang: string;
	jenisPengeluaran: string;
	jumlah: number;
	keterangan: string;
}

export function PengeluaranAdminPage() {
	return (
		<ResourceAdminPage<Pengeluaran, PengeluaranForm>
			resource="pengeluaran"
			title="Pengeluaran"
			columns={[
				{ key: "noPengajuan", header: "No" },
				{
					key: "tanggal",
					header: "Tanggal",
					render: (p) => formatDate(p.tanggal),
				},
				{ key: "namaKoordinator", header: "Koordinator" },
				{ key: "jenisPengeluaran", header: "Jenis" },
				{
					key: "jumlah",
					header: "Jumlah",
					render: (p) => formatIdr(p.jumlah),
				},
			]}
			toFormValues={(row) => ({
				tanggal:
					row?.tanggal?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
				namaKoordinator: row?.namaKoordinator ?? "",
				koordinatorBidang: row?.koordinatorBidang ?? "",
				jenisPengeluaran: row?.jenisPengeluaran ?? "",
				jumlah: row?.jumlah ?? 0,
				keterangan: "",
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="tanggal">Tanggal</Label>
						<Input
							id="tanggal"
							type="date"
							{...form.register("tanggal", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jumlah">Jumlah</Label>
						<Input
							id="jumlah"
							type="number"
							{...form.register("jumlah", { valueAsNumber: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="koordinator">Koordinator</Label>
						<Input
							id="koordinator"
							{...form.register("namaKoordinator", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="bidang">Bidang</Label>
						<Input
							id="bidang"
							{...form.register("koordinatorBidang", { required: true })}
						/>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="jenis">Jenis Pengeluaran</Label>
						<Input
							id="jenis"
							{...form.register("jenisPengeluaran", { required: true })}
						/>
					</div>
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="keterangan">Keterangan</Label>
						<Textarea id="keterangan" {...form.register("keterangan")} />
					</div>
				</div>
			)}
		/>
	);
}
