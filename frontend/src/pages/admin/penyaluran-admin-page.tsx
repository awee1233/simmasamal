import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { useResourceList } from "@/hooks/use-resource";
import { formatDate, formatIdr } from "@/lib/utils";

interface Mustahik {
	id: number;
	namaMustahik: string;
}

interface Penerima {
	mustahikId: number;
	jumlahTerima: number;
	jumlahTerimaUang?: number;
	jumlahTerimaBeras?: number;
	statusPenerima?: string;
}

interface Penyaluran {
	noPenyaluran: string;
	tanggalPenyaluran: string;
	petugasPenyaluran: string;
	jenisZakat: string;
	totalPenyaluran: number;
	berasDisalurkan: number;
	statusPenyaluran: string;
}

interface PenyaluranForm {
	petugasPenyaluran: string;
	jenisZakat: string;
	totalPenyaluran: number;
	berasDisalurkan: number;
	statusPenyaluran: string;
	keterangan: string;
	penerimas: Penerima[];
}

export function PenyaluranAdminPage() {
	return (
		<ResourceAdminPage<Penyaluran & { id: string }, PenyaluranForm>
			resource="penyaluran"
			title="Penyaluran Zakat"
			searchable={false}
			columns={[
				{ key: "noPenyaluran", header: "No Penyaluran" },
				{
					key: "tanggalPenyaluran",
					header: "Tanggal",
					render: (p) => formatDate(p.tanggalPenyaluran),
				},
				{ key: "jenisZakat", header: "Jenis" },
				{
					key: "totalPenyaluran",
					header: "Total",
					render: (p) => formatIdr(p.totalPenyaluran),
				},
				{ key: "statusPenyaluran", header: "Status" },
			]}
			toFormValues={(row) => ({
				petugasPenyaluran: row?.petugasPenyaluran ?? "",
				jenisZakat: row?.jenisZakat ?? "Zakat Fitrah",
				totalPenyaluran: row?.totalPenyaluran ?? 0,
				berasDisalurkan: row?.berasDisalurkan ?? 0,
				statusPenyaluran: row?.statusPenyaluran ?? "selesai",
				keterangan: "",
				penerimas: [
					{
						mustahikId: 0,
						jumlahTerima: 0,
						jumlahTerimaUang: 0,
						jumlahTerimaBeras: 0,
						statusPenerima: "pending",
					},
				],
			})}
			renderForm={(form) => <Form form={form} />}
		/>
	);
}

function Form({ form }: { form: ReturnType<typeof helperForm> }) {
	const mustahiks = useResourceList<Mustahik>("mustahik", { limit: 200 });
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "penerimas",
	});
	return (
		<div className="grid gap-3">
			<div className="grid gap-3 md:grid-cols-2">
				<div className="space-y-1.5">
					<Label htmlFor="petugas">Petugas Penyaluran</Label>
					<Input
						id="petugas"
						{...form.register("petugasPenyaluran", { required: true })}
					/>
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="jenis">Jenis Zakat</Label>
					<Select
						id="jenis"
						{...form.register("jenisZakat", { required: true })}
					>
						<option value="Zakat Fitrah">Zakat Fitrah</option>
						<option value="Zakat Mal">Zakat Mal</option>
						<option value="Zakat Fidyah">Zakat Fidyah</option>
					</Select>
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="total">Total (Rp)</Label>
					<Input
						id="total"
						type="number"
						{...form.register("totalPenyaluran", { valueAsNumber: true })}
					/>
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="beras">Beras (kg)</Label>
					<Input
						id="beras"
						type="number"
						step="0.01"
						{...form.register("berasDisalurkan", { valueAsNumber: true })}
					/>
				</div>
				<div className="space-y-1.5 md:col-span-2">
					<Label htmlFor="keterangan">Keterangan</Label>
					<Textarea id="keterangan" {...form.register("keterangan")} />
				</div>
			</div>
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label>Penerima</Label>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() =>
							append({
								mustahikId: 0,
								jumlahTerima: 0,
								jumlahTerimaUang: 0,
								jumlahTerimaBeras: 0,
								statusPenerima: "pending",
							})
						}
					>
						<Plus className="h-4 w-4" /> Tambah Penerima
					</Button>
				</div>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="grid gap-2 rounded-md border p-3 md:grid-cols-[2fr,1fr,1fr,auto]"
					>
						<Select
							{...form.register(`penerimas.${index}.mustahikId` as const, {
								valueAsNumber: true,
								required: true,
							})}
						>
							<option value={0}>Pilih mustahik…</option>
							{(mustahiks.data?.items ?? []).map((m) => (
								<option key={m.id} value={m.id}>
									{m.namaMustahik}
								</option>
							))}
						</Select>
						<Input
							type="number"
							placeholder="Uang (Rp)"
							{...form.register(`penerimas.${index}.jumlahTerima` as const, {
								valueAsNumber: true,
							})}
						/>
						<Input
							type="number"
							step="0.01"
							placeholder="Beras (kg)"
							{...form.register(
								`penerimas.${index}.jumlahTerimaBeras` as const,
								{
									valueAsNumber: true,
								},
							)}
						/>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => remove(index)}
							aria-label="Hapus"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}

function helperForm() {
	return null as unknown as import("react-hook-form").UseFormReturn<PenyaluranForm>;
}
