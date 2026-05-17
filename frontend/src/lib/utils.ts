import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function formatIdr(value: number | string | null | undefined): string {
	if (value == null) return "Rp 0";
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(n)) return "Rp 0";
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	}).format(n);
}

export function formatDate(value: Date | string | null | undefined): string {
	if (!value) return "-";
	const d = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(d.getTime())) return "-";
	return d.toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}
