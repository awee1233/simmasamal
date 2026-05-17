import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	DataTable,
	type DataTableColumn,
} from "@/components/shared/data-table";
import { ErrorState, LoadingState } from "@/components/shared/feedback";
import { Modal } from "@/components/shared/modal";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form";
import { useDeleteResource, useResourceList } from "@/hooks/use-resource";
import { apiClient } from "@/lib/api-client";

interface Inventory {
	id: number;
	nama: string;
	kondisi: "Baik" | "Rusak" | "Hilang";
	quantity: number;
	jumlahBaik: number;
	jumlahRusak: number;
	jumlahHilang: number;
	gambar: string | null;
}

interface InventoryForm {
	nama: string;
	kondisi: "Baik" | "Rusak" | "Hilang";
	quantity: number;
	jumlahBaik: number;
	jumlahRusak: number;
	jumlahHilang: number;
	gambar?: FileList;
}

const columns: DataTableColumn<Inventory>[] = [
	{ key: "nama", header: "Nama" },
	{ key: "kondisi", header: "Kondisi" },
	{ key: "quantity", header: "Qty" },
	{ key: "jumlahBaik", header: "Baik" },
	{ key: "jumlahRusak", header: "Rusak" },
	{ key: "jumlahHilang", header: "Hilang" },
];

export function InventoryAdminPage() {
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState<Inventory | null>(null);
	const list = useResourceList<Inventory>("inventory");
	const del = useDeleteResource("inventory");
	const qc = useQueryClient();
	const form = useForm<InventoryForm>();

	function openCreate() {
		setEditing(null);
		form.reset({
			nama: "",
			kondisi: "Baik",
			quantity: 0,
			jumlahBaik: 0,
			jumlahRusak: 0,
			jumlahHilang: 0,
		});
		setOpen(true);
	}
	function openEdit(row: Inventory) {
		setEditing(row);
		form.reset({
			nama: row.nama,
			kondisi: row.kondisi,
			quantity: row.quantity,
			jumlahBaik: row.jumlahBaik,
			jumlahRusak: row.jumlahRusak,
			jumlahHilang: row.jumlahHilang,
		});
		setOpen(true);
	}
	async function handleSubmit(values: InventoryForm) {
		const fd = new FormData();
		fd.append("nama", values.nama);
		fd.append("kondisi", values.kondisi);
		fd.append("quantity", String(values.quantity));
		fd.append("jumlahBaik", String(values.jumlahBaik));
		fd.append("jumlahRusak", String(values.jumlahRusak));
		fd.append("jumlahHilang", String(values.jumlahHilang));
		if (values.gambar?.[0]) fd.append("gambar", values.gambar[0]);
		if (editing) {
			await apiClient.put(`/inventory/${editing.id}`, fd, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		} else {
			await apiClient.post("/inventory", fd, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		}
		await qc.invalidateQueries({ queryKey: ["inventory"] });
		setOpen(false);
	}
	async function handleDelete(row: Inventory) {
		if (!confirm("Hapus inventaris ini?")) return;
		await del.mutateAsync(row.id);
	}

	return (
		<div>
			<PageHeader
				title="Inventaris Masjid"
				actions={<Button onClick={openCreate}>Tambah</Button>}
			/>
			{list.isLoading ? (
				<LoadingState />
			) : list.isError ? (
				<ErrorState error={list.error} />
			) : (
				<DataTable
					columns={columns}
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
				title={editing ? "Ubah Inventaris" : "Tambah Inventaris"}
			>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<div className="grid gap-3 md:grid-cols-2">
						<div className="space-y-1.5 md:col-span-2">
							<Label htmlFor="nama">Nama</Label>
							<Input id="nama" {...form.register("nama", { required: true })} />
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="kondisi">Kondisi</Label>
							<Select id="kondisi" {...form.register("kondisi")}>
								<option value="Baik">Baik</option>
								<option value="Rusak">Rusak</option>
								<option value="Hilang">Hilang</option>
							</Select>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="quantity">Quantity</Label>
							<Input
								id="quantity"
								type="number"
								{...form.register("quantity", { valueAsNumber: true })}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="baik">Jumlah Baik</Label>
							<Input
								id="baik"
								type="number"
								{...form.register("jumlahBaik", { valueAsNumber: true })}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="rusak">Jumlah Rusak</Label>
							<Input
								id="rusak"
								type="number"
								{...form.register("jumlahRusak", { valueAsNumber: true })}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="hilang">Jumlah Hilang</Label>
							<Input
								id="hilang"
								type="number"
								{...form.register("jumlahHilang", { valueAsNumber: true })}
							/>
						</div>
						<div className="space-y-1.5 md:col-span-2">
							<Label htmlFor="gambar">Gambar</Label>
							<Input
								id="gambar"
								type="file"
								accept="image/*"
								{...form.register("gambar")}
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
		</div>
	);
}
