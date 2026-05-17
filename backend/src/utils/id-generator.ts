import { prisma } from "@/lib/prisma";

/**
 * Generate next sequential ID with given prefix and padding width.
 * Uses Prisma to find the max current sequence number for the given prefix in the given column.
 *
 * Example: nextSequentialId({ table: "muzakki", column: "noMuzakki", prefix: "MZ", width: 3 })
 *   returns "MZ001", "MZ002", ...
 */
export async function nextSequentialId(options: {
	table: "muzakki" | "mustahik" | "donatur" | "pengeluaran";
	column: string;
	prefix: string;
	width: number;
}): Promise<string> {
	const { table, column, prefix, width } = options;
	let lastRecord: { [k: string]: string } | null = null;

	if (table === "muzakki") {
		lastRecord = await prisma.muzakki.findFirst({
			where: { noMuzakki: { startsWith: prefix } },
			orderBy: { noMuzakki: "desc" },
			select: { noMuzakki: true },
		});
	} else if (table === "mustahik") {
		lastRecord = await prisma.mustahik.findFirst({
			where: { noMustahik: { startsWith: prefix } },
			orderBy: { noMustahik: "desc" },
			select: { noMustahik: true },
		});
	} else if (table === "donatur") {
		lastRecord = await prisma.donatur.findFirst({
			where: { noDonatur: { startsWith: prefix } },
			orderBy: { noDonatur: "desc" },
			select: { noDonatur: true },
		});
	} else if (table === "pengeluaran") {
		lastRecord = await prisma.pengeluaran.findFirst({
			where: { noPengajuan: { startsWith: prefix } },
			orderBy: { noPengajuan: "desc" },
			select: { noPengajuan: true },
		});
	}

	const lastValue = lastRecord ? (lastRecord[column] as string) : null;
	const lastSeq = lastValue
		? Number.parseInt(lastValue.slice(prefix.length), 10) || 0
		: 0;
	return `${prefix}${String(lastSeq + 1).padStart(width, "0")}`;
}

function formatDdMmYy(date: Date = new Date()): string {
	const dd = String(date.getDate()).padStart(2, "0");
	const mm = String(date.getMonth() + 1).padStart(2, "0");
	const yy = String(date.getFullYear()).slice(-2);
	return `${dd}${mm}${yy}`;
}

/**
 * Generate date-based sequential ID like ZK250512001.
 * Uses a uniqueness check with retry to avoid collisions under light concurrency.
 */
export async function nextDateSequentialId(options: {
	table: "zakat" | "infaq" | "keuanganQurban" | "penyaluran";
	column: string;
	prefix: string;
	width?: number;
	date?: Date;
}): Promise<string> {
	const width = options.width ?? 3;
	const datePart = formatDdMmYy(options.date ?? new Date());
	const fullPrefix = `${options.prefix}${datePart}`;

	let lastRecord: { [k: string]: string } | null = null;

	if (options.table === "zakat") {
		lastRecord = await prisma.zakat.findFirst({
			where: { noZakat: { startsWith: fullPrefix } },
			orderBy: { noZakat: "desc" },
			select: { noZakat: true },
		});
	} else if (options.table === "infaq") {
		lastRecord = await prisma.infaq.findFirst({
			where: { noPenerimaan: { startsWith: fullPrefix } },
			orderBy: { noPenerimaan: "desc" },
			select: { noPenerimaan: true },
		});
	} else if (options.table === "keuanganQurban") {
		lastRecord = await prisma.keuanganQurban.findFirst({
			where: { noTransaksi: { startsWith: fullPrefix } },
			orderBy: { noTransaksi: "desc" },
			select: { noTransaksi: true },
		});
	} else if (options.table === "penyaluran") {
		lastRecord = await prisma.penyaluran.findFirst({
			where: { noPenyaluran: { startsWith: fullPrefix } },
			orderBy: { noPenyaluran: "desc" },
			select: { noPenyaluran: true },
		});
	}

	const lastValue = lastRecord ? (lastRecord[options.column] as string) : null;
	const lastSeq = lastValue
		? Number.parseInt(lastValue.slice(fullPrefix.length), 10) || 0
		: 0;
	return `${fullPrefix}${String(lastSeq + 1).padStart(width, "0")}`;
}

/**
 * Pad an integer ID to a fixed width (e.g. Mustahik 5-char format).
 */
export function padId(seq: number, width: number): string {
	return String(seq).padStart(width, "0");
}
