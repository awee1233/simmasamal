import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	DataTable,
	type DataTableColumn,
} from "@/components/shared/data-table";
import { ErrorState, LoadingState } from "@/components/shared/feedback";
import { Modal } from "@/components/shared/modal";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form";
import {
	useCreateResource,
	useDeleteResource,
	useResourceList,
	useUpdateResource,
} from "@/hooks/use-resource";

interface AturanPembagian {
	id: number;
	status: string;
	produk: string[];
}

interface PembagianProduk {
	id: number;
	produk: string;
	berat: number;
	totalBungkus: number;
	beratPerproduk: number;
}

interface AturanForm {
	status: string;
	produk: { value: string }[];
}

interface ProdukForm {
	produk: string;
	berat: number;
	totalBungkus: number;
}

const aturanColumns: DataTableColumn<AturanPembagian>[] = [
	{ key: "status", header: "Status" },
	{
		key: "produk",
		header: "Produk",
		render: (a) => a.produk.join(", "),
	},
];

const produkColumns: DataTableColumn<PembagianProduk>[] = [
	{ key: "produk", header: "Produk" },
	{ key: "berat", header: "Berat (kg)" },
	{ key: "totalBungkus", header: "Total Bungkus" },
	{
		key: "beratPerproduk",
		header: "Berat/Bungkus",
		render: (p) => `${Number(p.beratPerproduk).toFixed(2)} kg`,
	},
];

export function AturanPembagianAdminPage() {
	return (
		<div className="space-y-8">
			<AturanSection />
			<ProdukSection />
		</div>
	);
}

function AturanSection() {
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState<AturanPembagian | null>(null);
	const list = useResourceList<AturanPembagian>("aturan-pembagian");
	const create = useCreateResource<unknown>("aturan-pembagian");
	const update = useUpdateResource<unknown>("aturan-pembagian");
	const del = useDeleteResource("aturan-pembagian");

	const form = useForm<AturanForm>({
		defaultValues: { status: "", produk: [{ value: "" }] },
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "produk",
	});

	function openCreate() {
		setEditing(null);
		form.reset({ status: "", produk: [{ value: "" }] });
		setOpen(true);
	}
	function openEdit(row: AturanPembagian) {
		setEditing(row);
		form.reset({
			status: row.status,
			produk: row.produk.map((p) => ({ value: p })),
		});
		setOpen(true);
	}
	async function handleSubmit(values: AturanForm) {
		const payload = {
			status: values.status,
			produk: values.produk.map((p) => p.value).filter(Boolean),
		};
		if (editing) await update.mutateAsync({ id: editing.id, data: payload });
		else await create.mutateAsync(payload);
		setOpen(false);
	}
	async function handleDelete(row: AturanPembagian) {
		if (!confirm("Hapus aturan ini?")) return;
		await del.mutateAsync(row.id);
	}

	return (
		<section>
			<PageHeader
				title="Aturan Pembagian"
				description="Siapa yang menerima produk apa saja."
				actions={<Button onClick={openCreate}>Tambah Aturan</Button>}
			/>
			{list.isLoading ? (
				<LoadingState />
			) : list.isError ? (
				<ErrorState error={list.error} />
			) : (
				<DataTable
					columns={aturanColumns}
					rows={list.data?.items ?? []}
					rowKey={(r) => r.id}
					actions={(row) => (
						<div className="flex justify-end gap-1">
							<Button variant="outline" size="sm" onClick={() => openEdit(row)}>
								Ubah
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleDelete(row)}
							>
								Hapus
							</Button>
						</div>
					)}
				/>
			)}
			<Modal
				open={open}
				onOpenChange={setOpen}
				title={editing ? "Ubah Aturan" : "Tambah Aturan"}
			>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="status">Status (penerima/panitia)</Label>
						<Input
							id="status"
							{...form.register("status", { required: true })}
						/>
					</div>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label>Produk</Label>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => append({ value: "" })}
							>
								<Plus className="h-4 w-4" /> Tambah Produk
							</Button>
						</div>
						{fields.map((field, index) => (
							<div key={field.id} className="flex gap-2">
								<Input
									placeholder="Nama produk"
									{...form.register(`produk.${index}.value` as const, {
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
					<div className="flex justify-end gap-2 border-t pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Batal
						</Button>
						<Button type="submit">{editing ? "Simpan" : "Buat"}</Button>
					</div>
				</form>
			</Modal>
		</section>
	);
}

function ProdukSection() {
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState<PembagianProduk | null>(null);
	const list = useResourceList<PembagianProduk>("pembagian-produk");
	const create = useCreateResource<unknown>("pembagian-produk");
	const update = useUpdateResource<unknown>("pembagian-produk");
	const del = useDeleteResource("pembagian-produk");
	const form = useForm<ProdukForm>({
		defaultValues: { produk: "", berat: 0, totalBungkus: 1 },
	});

	function openCreate() {
		setEditing(null);
		form.reset({ produk: "", berat: 0, totalBungkus: 1 });
		setOpen(true);
	}
	function openEdit(row: PembagianProduk) {
		setEditing(row);
		form.reset({
			produk: row.produk,
			berat: Number(row.berat),
			totalBungkus: row.totalBungkus,
		});
		setOpen(true);
	}
	async function handleSubmit(values: ProdukForm) {
		if (editing) await update.mutateAsync({ id: editing.id, data: values });
		else await create.mutateAsync(values);
		setOpen(false);
	}
	async function handleDelete(row: PembagianProduk) {
		if (!confirm("Hapus produk ini?")) return;
		await del.mutateAsync(row.id);
	}

	return (
		<section>
			<PageHeader
				title="Pembagian Produk"
				description="Daftar produk dan bungkus."
				actions={<Button onClick={openCreate}>Tambah Produk</Button>}
			/>
			{list.isLoading ? (
				<LoadingState />
			) : list.isError ? (
				<ErrorState error={list.error} />
			) : (
				<DataTable
					columns={produkColumns}
					rows={list.data?.items ?? []}
					rowKey={(r) => r.id}
					actions={(row) => (
						<div className="flex justify-end gap-1">
							<Button variant="outline" size="sm" onClick={() => openEdit(row)}>
								Ubah
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleDelete(row)}
							>
								Hapus
							</Button>
						</div>
					)}
				/>
			)}
			<Modal
				open={open}
				onOpenChange={setOpen}
				title={editing ? "Ubah Produk" : "Tambah Produk"}
			>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="produk">Produk</Label>
						<Input
							id="produk"
							{...form.register("produk", { required: true })}
						/>
					</div>
					<div className="grid gap-3 md:grid-cols-2">
						<div className="space-y-1.5">
							<Label htmlFor="berat">Berat Total (kg)</Label>
							<Input
								id="berat"
								type="number"
								step="0.01"
								{...form.register("berat", {
									valueAsNumber: true,
									required: true,
								})}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="bungkus">Total Bungkus</Label>
							<Input
								id="bungkus"
								type="number"
								{...form.register("totalBungkus", {
									valueAsNumber: true,
									required: true,
									min: 1,
								})}
							/>
						</div>
					</div>
					<div className="flex justify-end gap-2 border-t pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Batal
						</Button>
						<Button type="submit">{editing ? "Simpan" : "Buat"}</Button>
					</div>
				</form>
			</Modal>
		</section>
	);
}
