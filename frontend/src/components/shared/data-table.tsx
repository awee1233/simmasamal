import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { PaginationMeta } from "@/types";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
	key: string;
	header: string;
	render?: (row: T) => ReactNode;
	className?: string;
}

interface DataTableProps<T> {
	columns: DataTableColumn<T>[];
	rows: T[];
	rowKey: (row: T) => string | number;
	meta?: PaginationMeta;
	onPageChange?: (page: number) => void;
	emptyLabel?: string;
	actions?: (row: T) => ReactNode;
}

export function DataTable<T>({
	columns,
	rows,
	rowKey,
	meta,
	onPageChange,
	emptyLabel = "Belum ada data",
	actions,
}: DataTableProps<T>) {
	return (
		<div className="rounded-md border bg-card">
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
						<tr>
							{columns.map((c) => (
								<th key={c.key} className={cn("px-3 py-2", c.className)}>
									{c.header}
								</th>
							))}
							{actions ? <th className="px-3 py-2 text-right">Aksi</th> : null}
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 ? (
							<tr>
								<td
									colSpan={columns.length + (actions ? 1 : 0)}
									className="px-3 py-8 text-center text-muted-foreground"
								>
									{emptyLabel}
								</td>
							</tr>
						) : (
							rows.map((row) => (
								<tr key={rowKey(row)} className="border-t">
									{columns.map((c) => (
										<td key={c.key} className={cn("px-3 py-2", c.className)}>
											{c.render
												? c.render(row)
												: String((row as Record<string, unknown>)[c.key] ?? "")}
										</td>
									))}
									{actions ? (
										<td className="px-3 py-2 text-right">{actions(row)}</td>
									) : null}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			{meta && onPageChange ? (
				<div className="flex items-center justify-between border-t px-3 py-2 text-sm">
					<span className="text-muted-foreground">
						Halaman {meta.page} dari {meta.totalPages} · {meta.total} data
					</span>
					<div className="flex gap-1">
						<Button
							variant="outline"
							size="sm"
							disabled={meta.page <= 1}
							onClick={() => onPageChange(meta.page - 1)}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							disabled={meta.page >= meta.totalPages}
							onClick={() => onPageChange(meta.page + 1)}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}
