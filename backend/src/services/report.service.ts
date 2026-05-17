import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { prisma } from "@/lib/prisma";

export interface DateRangeFilter {
	from?: Date;
	to?: Date;
}

export interface QurbanFilter {
	tahunHijriah?: string;
	jenisHewan?: string;
}

type ReportFormat = "pdf" | "excel";

function dateRangeWhere(filter: DateRangeFilter, field: string) {
	const range: Record<string, Date> = {};
	if (filter.from) range.gte = filter.from;
	if (filter.to) range.lte = filter.to;
	if (Object.keys(range).length === 0) return {};
	return { [field]: range };
}

function formatIdr(value: number): string {
	return new Intl.NumberFormat("id-ID").format(value);
}

function formatDate(value: Date | string): string {
	const d = value instanceof Date ? value : new Date(value);
	return d.toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

interface PdfTableColumn<T> {
	header: string;
	width: number;
	value: (row: T) => string;
	align?: "left" | "right" | "center";
}

async function renderPdfTable<T>(
	title: string,
	columns: PdfTableColumn<T>[],
	rows: T[],
): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const doc = new PDFDocument({ size: "A4", margin: 36 });
		const chunks: Buffer[] = [];
		doc.on("data", (c: Buffer) => chunks.push(c));
		doc.on("end", () => resolve(Buffer.concat(chunks)));
		doc.on("error", reject);

		doc.fontSize(14).text(title, { align: "center" });
		doc.moveDown(0.5);

		const startX = doc.page.margins.left;
		let y = doc.y;
		const rowHeight = 18;

		// Header
		doc.fontSize(9).font("Helvetica-Bold");
		let x = startX;
		for (const col of columns) {
			doc.text(col.header, x + 2, y + 4, {
				width: col.width - 4,
				align: col.align ?? "left",
			});
			x += col.width;
		}
		y += rowHeight;
		doc
			.moveTo(startX, y)
			.lineTo(startX + columns.reduce((s, c) => s + c.width, 0), y)
			.stroke();

		doc.font("Helvetica").fontSize(9);
		for (const row of rows) {
			if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
				doc.addPage();
				y = doc.page.margins.top;
			}
			x = startX;
			for (const col of columns) {
				doc.text(col.value(row), x + 2, y + 4, {
					width: col.width - 4,
					align: col.align ?? "left",
				});
				x += col.width;
			}
			y += rowHeight;
		}

		doc.end();
	});
}

async function renderExcel(
	sheetName: string,
	columns: { header: string; key: string; width?: number }[],
	rows: Record<string, unknown>[],
): Promise<Buffer> {
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet(sheetName);
	sheet.columns = columns.map((c) => ({
		header: c.header,
		key: c.key,
		width: c.width ?? 20,
	}));
	sheet.getRow(1).font = { bold: true };
	for (const r of rows) sheet.addRow(r);
	const buf = await workbook.xlsx.writeBuffer();
	return Buffer.from(buf as ArrayBuffer);
}

export const reportService = {
	async generateZakatReport(
		filter: DateRangeFilter,
		format: ReportFormat,
	): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
		const where = dateRangeWhere(filter, "tanggalZakat");
		const items = await prisma.zakat.findMany({
			where,
			include: { muzakki: true },
			orderBy: { tanggalZakat: "asc" },
		});

		if (format === "excel") {
			const rows = items.map((z) => ({
				noZakat: z.noZakat,
				tanggal: formatDate(z.tanggalZakat),
				muzakki: z.muzakki.namaMuzakki,
				jenisZakat: z.jenisZakat,
				jenisBayar: z.jenisBayar,
				jumlah: Number(z.jumlahZakat),
				beratBeras: z.beratBeras ? Number(z.beratBeras) : 0,
				status: z.status,
			}));
			const buffer = await renderExcel(
				"Zakat",
				[
					{ header: "No Zakat", key: "noZakat", width: 18 },
					{ header: "Tanggal", key: "tanggal", width: 14 },
					{ header: "Muzakki", key: "muzakki", width: 24 },
					{ header: "Jenis", key: "jenisZakat", width: 18 },
					{ header: "Bayar", key: "jenisBayar", width: 10 },
					{ header: "Jumlah", key: "jumlah", width: 16 },
					{ header: "Berat Beras (kg)", key: "beratBeras", width: 16 },
					{ header: "Status", key: "status", width: 12 },
				],
				rows,
			);
			return {
				buffer,
				contentType:
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				filename: "laporan-zakat.xlsx",
			};
		}

		const buffer = await renderPdfTable(
			"Laporan Zakat",
			[
				{ header: "No Zakat", width: 90, value: (z) => z.noZakat },
				{
					header: "Tanggal",
					width: 70,
					value: (z) => formatDate(z.tanggalZakat),
				},
				{ header: "Muzakki", width: 140, value: (z) => z.muzakki.namaMuzakki },
				{ header: "Jenis", width: 90, value: (z) => z.jenisZakat },
				{ header: "Bayar", width: 60, value: (z) => z.jenisBayar },
				{
					header: "Jumlah",
					width: 80,
					align: "right",
					value: (z) => formatIdr(Number(z.jumlahZakat)),
				},
				{ header: "Status", width: 60, value: (z) => z.status },
			],
			items,
		);
		return {
			buffer,
			contentType: "application/pdf",
			filename: "laporan-zakat.pdf",
		};
	},

	async generateInfaqReport(filter: DateRangeFilter, format: ReportFormat) {
		const where = {
			...dateRangeWhere(filter, "tanggal"),
			status: "success",
		};
		const items = await prisma.infaq.findMany({
			where,
			include: { donatur: true },
			orderBy: { tanggal: "asc" },
		});
		if (format === "excel") {
			const rows = items.map((i) => ({
				noPenerimaan: i.noPenerimaan,
				tanggal: formatDate(i.tanggal),
				donatur: i.donatur.nama,
				jenis: i.jenisPenerimaan,
				jumlah: Number(i.jumlah),
				status: i.status,
			}));
			const buffer = await renderExcel(
				"Infaq",
				[
					{ header: "No Penerimaan", key: "noPenerimaan", width: 18 },
					{ header: "Tanggal", key: "tanggal", width: 14 },
					{ header: "Donatur", key: "donatur", width: 24 },
					{ header: "Jenis", key: "jenis", width: 18 },
					{ header: "Jumlah", key: "jumlah", width: 16 },
					{ header: "Status", key: "status", width: 12 },
				],
				rows,
			);
			return {
				buffer,
				contentType:
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				filename: "laporan-infaq.xlsx",
			};
		}
		const buffer = await renderPdfTable(
			"Laporan Infaq",
			[
				{ header: "No Penerimaan", width: 100, value: (i) => i.noPenerimaan },
				{ header: "Tanggal", width: 70, value: (i) => formatDate(i.tanggal) },
				{ header: "Donatur", width: 140, value: (i) => i.donatur.nama },
				{ header: "Jenis", width: 90, value: (i) => i.jenisPenerimaan },
				{
					header: "Jumlah",
					width: 80,
					align: "right",
					value: (i) => formatIdr(Number(i.jumlah)),
				},
				{ header: "Status", width: 60, value: (i) => i.status },
			],
			items,
		);
		return {
			buffer,
			contentType: "application/pdf",
			filename: "laporan-infaq.pdf",
		};
	},

	async generatePengeluaranReport(
		filter: DateRangeFilter,
		format: ReportFormat,
	) {
		const where = dateRangeWhere(filter, "tanggal");
		const items = await prisma.pengeluaran.findMany({
			where,
			orderBy: { tanggal: "asc" },
		});
		if (format === "excel") {
			const rows = items.map((p) => ({
				noPengajuan: p.noPengajuan,
				tanggal: formatDate(p.tanggal),
				koordinator: p.namaKoordinator,
				bidang: p.koordinatorBidang,
				jenis: p.jenisPengeluaran,
				jumlah: Number(p.jumlah),
				keterangan: p.keterangan ?? "",
			}));
			const buffer = await renderExcel(
				"Pengeluaran",
				[
					{ header: "No Pengajuan", key: "noPengajuan", width: 18 },
					{ header: "Tanggal", key: "tanggal", width: 14 },
					{ header: "Koordinator", key: "koordinator", width: 22 },
					{ header: "Bidang", key: "bidang", width: 20 },
					{ header: "Jenis", key: "jenis", width: 22 },
					{ header: "Jumlah", key: "jumlah", width: 16 },
					{ header: "Keterangan", key: "keterangan", width: 30 },
				],
				rows,
			);
			return {
				buffer,
				contentType:
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				filename: "laporan-pengeluaran.xlsx",
			};
		}
		const buffer = await renderPdfTable(
			"Laporan Pengeluaran",
			[
				{ header: "No Pengajuan", width: 90, value: (p) => p.noPengajuan },
				{ header: "Tanggal", width: 70, value: (p) => formatDate(p.tanggal) },
				{
					header: "Koordinator",
					width: 110,
					value: (p) => p.namaKoordinator,
				},
				{ header: "Jenis", width: 110, value: (p) => p.jenisPengeluaran },
				{
					header: "Jumlah",
					width: 90,
					align: "right",
					value: (p) => formatIdr(Number(p.jumlah)),
				},
			],
			items,
		);
		return {
			buffer,
			contentType: "application/pdf",
			filename: "laporan-pengeluaran.pdf",
		};
	},

	async generateShohibulQurbanReport(filter: QurbanFilter) {
		const items = await prisma.shohibulQurban.findMany({
			where: {
				AND: [
					filter.tahunHijriah ? { tahunHijriah: filter.tahunHijriah } : {},
					filter.jenisHewan ? { jenisHewan: filter.jenisHewan } : {},
				],
			},
			include: { details: true },
			orderBy: { createdAt: "asc" },
		});
		const buffer = await renderPdfTable(
			"Laporan Shohibul Qurban",
			[
				{ header: "NIK", width: 110, value: (s) => s.nik },
				{ header: "Nama", width: 160, value: (s) => s.nama },
				{ header: "HP", width: 100, value: (s) => s.hp },
				{ header: "Jenis", width: 90, value: (s) => s.jenisHewan },
				{ header: "Tahun", width: 60, value: (s) => s.tahunHijriah },
			],
			items,
		);
		return {
			buffer,
			contentType: "application/pdf",
			filename: "laporan-shohibul-qurban.pdf",
		};
	},

	async generateKeuanganQurbanReport(filter: DateRangeFilter) {
		const where = dateRangeWhere(filter, "tanggal");
		const items = await prisma.keuanganQurban.findMany({
			where,
			orderBy: { tanggal: "asc" },
		});
		const rows = items.map((k) => ({
			noTransaksi: k.noTransaksi,
			tanggal: formatDate(k.tanggal),
			jenis: k.jenis,
			jumlah: Number(k.jumlah),
			keterangan: k.keterangan ?? "",
		}));
		const buffer = await renderExcel(
			"Keuangan Qurban",
			[
				{ header: "No Transaksi", key: "noTransaksi", width: 18 },
				{ header: "Tanggal", key: "tanggal", width: 14 },
				{ header: "Jenis", key: "jenis", width: 22 },
				{ header: "Jumlah", key: "jumlah", width: 16 },
				{ header: "Keterangan", key: "keterangan", width: 30 },
			],
			rows,
		);
		return {
			buffer,
			contentType:
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			filename: "laporan-keuangan-qurban.xlsx",
		};
	},

	async generateQurbanNametags(filter: QurbanFilter) {
		const items = await prisma.shohibulQurban.findMany({
			where: {
				AND: [
					filter.tahunHijriah ? { tahunHijriah: filter.tahunHijriah } : {},
					filter.jenisHewan ? { jenisHewan: filter.jenisHewan } : {},
				],
			},
			include: { details: true },
			orderBy: { createdAt: "asc" },
		});
		return new Promise<{
			buffer: Buffer;
			contentType: string;
			filename: string;
		}>((resolve, reject) => {
			const doc = new PDFDocument({ size: "A6", margin: 18 });
			const chunks: Buffer[] = [];
			doc.on("data", (c: Buffer) => chunks.push(c));
			doc.on("end", () =>
				resolve({
					buffer: Buffer.concat(chunks),
					contentType: "application/pdf",
					filename: "nametag-qurban.pdf",
				}),
			);
			doc.on("error", reject);

			items.forEach((sq, index) => {
				if (index > 0) doc.addPage();
				doc
					.fontSize(12)
					.font("Helvetica-Bold")
					.text("SHOHIBUL QURBAN", { align: "center" });
				doc.moveDown(0.4);
				doc
					.font("Helvetica-Bold")
					.fontSize(14)
					.text(sq.nama, { align: "center" });
				doc.moveDown(0.3);
				doc.fontSize(10).font("Helvetica").text(`NIK: ${sq.nik}`);
				doc.text(`Hewan: ${sq.jenisHewan}`);
				doc.text(`Tahun: ${sq.tahunHijriah}`);
				if (sq.details.length > 0) {
					doc.moveDown(0.4);
					doc.font("Helvetica-Bold").text("Atas Nama:");
					doc.font("Helvetica");
					for (const d of sq.details) {
						doc.text(`- ${d.nama} ${d.binOrBinti} ${d.binOrBintiValue}`);
					}
				}
			});

			if (items.length === 0) {
				doc.text("Tidak ada data shohibul qurban.", { align: "center" });
			}

			doc.end();
		});
	},
};
