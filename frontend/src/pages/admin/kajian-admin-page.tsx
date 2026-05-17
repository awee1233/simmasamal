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
import { Input, Label, Textarea } from "@/components/ui/form";
import { useDeleteResource, useResourceList } from "@/hooks/use-resource";
import { apiClient } from "@/lib/api-client";
import { formatDate } from "@/lib/utils";

interface Kajian {
	id: number;
	judulKajian: string;
	deskripsiKajian: string;
	tanggalKajian: string;
	fotoKajian: string | null;
	fotoUstad: string | null;
	namaUstad: string | null;
}

interface KajianForm {
	judulKajian: string;
	deskripsiKajian: string;
	tanggalKajian: string;
	namaUstad: string;
	fotoKajian?: FileList;
	fotoUstad?: FileList;
}

const columns: DataTableColumn<Kajian>[] = [
	{ key: "judulKajian", header: "Judul" },
	{ key: "namaUstad", header: "Ustad" },
	{
		key: "tanggalKajian",
		header: "Tanggal",
		render: (k) => formatDate(k.tanggalKajian),
	},
];

export function KajianAdminPage() {
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState<Kajian | null>(null);
	const list = useResourceList<Kajian>("kajian");
	const delMutation = useDeleteResource("kajian");
	const qc = useQueryClient();
	const form = useForm<KajianForm>();

	function openCreate() {
		setEditing(null);
		form.reset({
			judulKajian: "",
			deskripsiKajian: "",
			tanggalKajian: new Date().toISOString().slice(0, 10),
			namaUstad: "",
		});
		setOpen(true);
	}

	function openEdit(row: Kajian) {
		setEditing(row);
		form.reset({
			judulKajian: row.judulKajian,
			deskripsiKajian: row.deskripsiKajian,
			tanggalKajian: row.tanggalKajian.slice(0, 10),
			namaUstad: row.namaUstad ?? "",
		});
		setOpen(true);
	}

	async function handleSubmit(values: KajianForm) {
		const fd = new FormData();
		fd.append("judulKajian", values.judulKajian);
		fd.append("deskripsiKajian", values.deskripsiKajian);
		fd.append("tanggalKajian", values.tanggalKajian);
		fd.append("namaUstad", values.namaUstad);
		if (values.fotoKajian?.[0]) fd.append("fotoKajian", values.fotoKajian[0]);
		if (values.fotoUstad?.[0]) fd.append("fotoUstad", values.fotoUstad[0]);

		if (editing) {
			await apiClient.put(`/kajian/${editing.id}`, fd, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		} else {
			await apiClient.post("/kajian", fd, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		}
		await qc.invalidateQueries({ queryKey: ["kajian"] });
		setOpen(false);
	}

	async function handleDelete(row: Kajian) {
		if (!confirm("Hapus kajian ini?")) return;
		await delMutation.mutateAsync(row.id);
	}

	return (
		<div>
			<PageHeader
				title="Kajian"
				description="Jadwal kajian rutin."
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
				title={editing ? "Ubah Kajian" : "Tambah Kajian"}
				size="lg"
			>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="judul">Judul Kajian</Label>
						<Input
							id="judul"
							{...form.register("judulKajian", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="deskripsi">Deskripsi</Label>
						<Textarea
							id="deskripsi"
							{...form.register("deskripsiKajian", { required: true })}
						/>
					</div>
					<div className="grid gap-3 md:grid-cols-2">
						<div className="space-y-1.5">
							<Label htmlFor="tanggal">Tanggal</Label>
							<Input
								id="tanggal"
								type="date"
								{...form.register("tanggalKajian", { required: true })}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="ustad">Nama Ustad</Label>
							<Input id="ustad" {...form.register("namaUstad")} />
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="fotoKajian">Foto Kajian</Label>
							<Input
								id="fotoKajian"
								type="file"
								accept="image/*"
								{...form.register("fotoKajian")}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="fotoUstad">Foto Ustad</Label>
							<Input
								id="fotoUstad"
								type="file"
								accept="image/*"
								{...form.register("fotoUstad")}
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
