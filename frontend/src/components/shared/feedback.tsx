import { Loader2 } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

export function LoadingState({
	label = "Memuat data…",
	className,
}: {
	label?: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex items-center justify-center gap-3 p-8 text-muted-foreground",
				className,
			)}
		>
			<Loader2 className="h-5 w-5 animate-spin" />
			<span>{label}</span>
		</div>
	);
}

export function ErrorState({
	error,
	className,
}: {
	error: unknown;
	className?: string;
}) {
	const message =
		(error as { response?: { data?: { message?: string } } })?.response?.data
			?.message ??
		(error instanceof Error ? error.message : "Terjadi kesalahan");
	return (
		<div
			className={cn(
				"rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive",
				className,
			)}
			role="alert"
		>
			{message}
		</div>
	);
}

export function EmptyState({
	title,
	description,
	action,
}: {
	title: string;
	description?: string;
	action?: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center justify-center gap-2 p-12 text-center">
			<p className="text-base font-semibold">{title}</p>
			{description ? (
				<p className="text-sm text-muted-foreground">{description}</p>
			) : null}
			{action}
		</div>
	);
}
