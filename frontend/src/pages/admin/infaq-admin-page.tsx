import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select } from "@/components/ui/form";
import { formatDate, formatIdr } from "@/lib/utils";
import { useResourceList } from "@/hooks/use-resource";

interface Donatur {
	id: number;
	nama: string;
}

interface Infaq {
	id: number;
	noPenerimaan: string;
	tanggal: string;
	donatur: { nama: string };
	jenisPenerimaan: string;
	jumlah: number;
	status: string;
}

interface InfaqForm {
	donaturId: number;
	jenisPenerimaan: string;
	jumlah: number;
	status: "success" | "pending";
}

export function InfaqAdminPage() {
	const donaturs = useResourceList<Donatur>("donatur", { limit: 200 });
	return (
		<ResourceAdminPage<Infaq, InfaqForm>
			resource="infaq"
			title="Penerimaan Infaq"
			searchable={false}
			columns={[
				{ key: "noPenerimaan", header: "No" },
				{
					key: "tanggal",
					header: "Tanggal",
					render: (i) => formatDate(i.tanggal),
				},
				{
					key: "donatur",
					header: "Donatur",
					render: (i) => i.donatur?.nama ?? "-",
				},
				{ key: "jenisPenerimaan", header: "Jenis" },
				{
					key: "jumlah",
					header: "Jumlah",
					render: (i) => formatIdr(i.jumlah),
				},
				{ key: "status", header: "Status" },
			]}
			toFormValues={(row) => ({
				donaturId: 0,
				jenisPenerimaan: row?.jenisPenerimaan ?? "",
				jumlah: row?.jumlah ?? 0,
				status: (row?.status as InfaqForm["status"]) ?? "success",
			})}
			renderForm={(form) => (
				<div className="grid gap-3 md:grid-cols-2">
					<div className="space-y-1.5 md:col-span-2">
						<Label htmlFor="donatur">Donatur</Label>
						<Select
							id="donatur"
							{...form.register("donaturId", {
								valueAsNumber: true,
								required: true,
							})}
						>
							<option value="">Pilih donatur…</option>
							{(donaturs.data?.items ?? []).map((d) => (
								<option key={d.id} value={d.id}>
									{d.nama}
								</option>
							))}
						</Select>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jenis">Jenis Penerimaan</Label>
						<Input
							id="jenis"
							{...form.register("jenisPenerimaan", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jumlah">Jumlah (Rp)</Label>
						<Input
							id="jumlah"
							type="number"
							{...form.register("jumlah", { valueAsNumber: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="status">Status</Label>
						<Select id="status" {...form.register("status")}>
							<option value="success">Success</option>
							<option value="pending">Pending</option>
						</Select>
					</div>
				</div>
			)}
		/>
	);
}
