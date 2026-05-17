import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import {
	DataTable,
	type DataTableColumn,
} from "@/components/shared/data-table";
import { ErrorState, LoadingState } from "@/components/shared/feedback";
import { Modal } from "@/components/shared/modal";
import { PageHeader } from "@/components/shared/page-header";
import { SearchFilter } from "@/components/shared/search-filter";
import { Button } from "@/components/ui/button";
import {
	useCreateResource,
	useDeleteResource,
	useResourceList,
	useUpdateResource,
} from "@/hooks/use-resource";

export interface ResourceAdminPageProps<
	T extends { id: string | number },
	F extends FieldValues,
> {
	resource: string;
	title: string;
	description?: string;
	columns: DataTableColumn<T>[];
	searchPlaceholder?: string;
	queryParams?: Record<string, unknown>;
	extraFilters?: React.ReactNode;
	toFormValues: (row: T | null) => F;
	renderForm: (
		form: ReturnType<typeof useForm<F>>,
		editing: T | null,
	) => React.ReactNode;
	transformSubmit?: (values: F) => unknown;
	searchable?: boolean;
}

export function ResourceAdminPage<
	T extends { id: string | number },
	F extends FieldValues,
>({
	resource,
	title,
	description,
	columns,
	searchPlaceholder,
	queryParams,
	extraFilters,
	toFormValues,
	renderForm,
	transformSubmit,
	searchable = true,
}: ResourceAdminPageProps<T, F>) {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState<T | null>(null);

	const list = useResourceList<T>(resource, {
		page,
		limit: 15,
		...(searchable && search ? { search } : {}),
		...(queryParams ?? {}),
	});
	const createMutation = useCreateResource<unknown>(resource);
	const updateMutation = useUpdateResource<unknown>(resource);
	const deleteMutation = useDeleteResource(resource);

	const form = useForm<F>({
		defaultValues: toFormValues(
			null,
		) as import("react-hook-form").DefaultValues<F>,
	});

	function openCreate() {
		setEditing(null);
		form.reset(
			toFormValues(null) as import("react-hook-form").DefaultValues<F>,
		);
		setOpen(true);
	}

	function openEdit(row: T) {
		setEditing(row);
		form.reset(toFormValues(row) as import("react-hook-form").DefaultValues<F>);
		setOpen(true);
	}

	async function handleDelete(row: T) {
		if (!confirm("Hapus data ini?")) return;
		await deleteMutation.mutateAsync(row.id);
	}

	async function handleSubmit(values: F) {
		const payload = transformSubmit ? transformSubmit(values) : values;
		if (editing) {
			await updateMutation.mutateAsync({ id: editing.id, data: payload });
		} else {
			await createMutation.mutateAsync(payload);
		}
		setOpen(false);
	}

	return (
		<div>
			<PageHeader
				title={title}
				description={description}
				actions={<Button onClick={openCreate}>Tambah</Button>}
			/>

			<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
				{searchable ? (
					<SearchFilter
						value={search}
						onChange={(v) => {
							setSearch(v);
							setPage(1);
						}}
						placeholder={searchPlaceholder ?? "Cari…"}
						className="max-w-sm"
					/>
				) : null}
				{extraFilters}
			</div>

			{list.isLoading ? (
				<LoadingState />
			) : list.isError ? (
				<ErrorState error={list.error} />
			) : (
				<DataTable
					columns={columns}
					rows={list.data?.items ?? []}
					rowKey={(r) => r.id}
					meta={list.data?.meta}
					onPageChange={setPage}
					actions={(row) => (
						<div className="flex justify-end gap-1">
							<Button
								variant="outline"
								size="sm"
								onClick={() => openEdit(row)}
								aria-label="Edit"
							>
								<Pencil className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleDelete(row)}
								aria-label="Hapus"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					)}
				/>
			)}

			<Modal
				open={open}
				onOpenChange={setOpen}
				title={editing ? `Ubah ${title}` : `Tambah ${title}`}
				size="lg"
			>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					{renderForm(form, editing)}
					<div className="flex justify-end gap-2 border-t pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Batal
						</Button>
						<Button
							type="submit"
							disabled={createMutation.isPending || updateMutation.isPending}
						>
							{editing ? "Simpan" : "Buat"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
