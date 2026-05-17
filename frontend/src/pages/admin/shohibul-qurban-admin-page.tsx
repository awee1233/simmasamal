import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";

interface ShohibulDetail {
	id?: string;
	nama: string;
	binOrBinti: "bin" | "binti";
	binOrBintiValue: string;
}

interface ShohibulQurban {
	id: string;
	tahunHijriah: string;
	nik: string;
	nama: string;
	hp: string;
	alamat: string;
	jenisHewan: string;
	berat: string;
	bagianDiminta: string;
	tanggal: string;
	details: ShohibulDetail[];
}

interface ShohibulQurbanForm {
	tahunHijriah: string;
	nik: string;
	nama: string;
	hp: string;
	alamat: string;
	jenisHewan: string;
	berat: string;
	bagianDiminta: string;
	tanggal: string;
	details: ShohibulDetail[];
}

export function ShohibulQurbanAdminPage() {
	return (
		<ResourceAdminPage<ShohibulQurban, ShohibulQurbanForm>
			resource="shohibul-qurban"
			title="Shohibul Qurban"
			columns={[
				{ key: "nik", header: "NIK" },
				{ key: "nama", header: "Nama" },
				{ key: "jenisHewan", header: "Hewan" },
				{ key: "tahunHijriah", header: "Tahun" },
				{ key: "tanggal", header: "Tanggal" },
			]}
			toFormValues={(row) => ({
				tahunHijriah: row?.tahunHijriah ?? "",
				nik: row?.nik ?? "",
				nama: row?.nama ?? "",
				hp: row?.hp ?? "",
				alamat: row?.alamat ?? "",
				jenisHewan: row?.jenisHewan ?? "",
				berat: row?.berat ?? "",
				bagianDiminta: row?.bagianDiminta ?? "",
				tanggal: row?.tanggal ?? new Date().toISOString().slice(0, 10),
				details: row?.details?.map((d) => ({
					nama: d.nama,
					binOrBinti: d.binOrBinti,
					binOrBintiValue: d.binOrBintiValue,
				})) ?? [{ nama: "", binOrBinti: "bin", binOrBintiValue: "" }],
			})}
			renderForm={(form) => <Form form={form} />}
		/>
	);
}

function Form({ form }: { form: ReturnType<typeof useFieldArrayHelper> }) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "details",
	});
	return (
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
				<Label htmlFor="tahun">Tahun Hijriah</Label>
				<Input
					id="tahun"
					{...form.register("tahunHijriah", { required: true })}
				/>
			</div>
			<div className="space-y-1.5">
				<Label htmlFor="jenisHewan">Jenis Hewan</Label>
				<Input
					id="jenisHewan"
					{...form.register("jenisHewan", { required: true })}
				/>
			</div>
			<div className="space-y-1.5">
				<Label htmlFor="berat">Berat</Label>
				<Input id="berat" {...form.register("berat")} />
			</div>
			<div className="space-y-1.5">
				<Label htmlFor="tanggal">Tanggal</Label>
				<Input id="tanggal" {...form.register("tanggal", { required: true })} />
			</div>
			<div className="space-y-1.5">
				<Label htmlFor="bagian">Bagian Diminta</Label>
				<Input
					id="bagian"
					{...form.register("bagianDiminta", { required: true })}
				/>
			</div>
			<div className="space-y-1.5 md:col-span-2">
				<Label htmlFor="alamat">Alamat</Label>
				<Textarea
					id="alamat"
					{...form.register("alamat", { required: true })}
				/>
			</div>
			<div className="space-y-2 md:col-span-2">
				<div className="flex items-center justify-between">
					<Label>Atas Nama</Label>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() =>
							append({ nama: "", binOrBinti: "bin", binOrBintiValue: "" })
						}
					>
						<Plus className="h-4 w-4" /> Tambah
					</Button>
				</div>
				<div className="space-y-2">
					{fields.map((field, index) => (
						<div
							key={field.id}
							className="grid gap-2 md:grid-cols-[1fr,100px,1fr,auto]"
						>
							<Input
								placeholder="Nama"
								{...form.register(`details.${index}.nama` as const, {
									required: true,
								})}
							/>
							<Select
								{...form.register(`details.${index}.binOrBinti` as const)}
							>
								<option value="bin">bin</option>
								<option value="binti">binti</option>
							</Select>
							<Input
								placeholder="Nama ayah/ibu"
								{...form.register(`details.${index}.binOrBintiValue` as const, {
									required: true,
								})}
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
		</div>
	);
}

// Helper type to keep useFieldArray typing ergonomic
function useFieldArrayHelper() {
	return null as unknown as import("react-hook-form").UseFormReturn<ShohibulQurbanForm>;
}
