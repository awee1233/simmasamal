import type { Request, Response } from "express";
import { reportService } from "@/services/report.service";
import { asyncHandler } from "@/utils/async-handler";

function parseDateRange(req: Request) {
	return {
		from: req.query.from ? new Date(String(req.query.from)) : undefined,
		to: req.query.to ? new Date(String(req.query.to)) : undefined,
	};
}

function parseFormat(req: Request): "pdf" | "excel" {
	const raw = String(req.query.format ?? "pdf").toLowerCase();
	return raw === "excel" ? "excel" : "pdf";
}

function send(
	res: Response,
	result: { buffer: Buffer; contentType: string; filename: string },
) {
	res.setHeader("Content-Type", result.contentType);
	res.setHeader(
		"Content-Disposition",
		`attachment; filename="${result.filename}"`,
	);
	res.send(result.buffer);
}

export const reportsController = {
	zakat: asyncHandler(async (req: Request, res: Response) => {
		const result = await reportService.generateZakatReport(
			parseDateRange(req),
			parseFormat(req),
		);
		send(res, result);
	}),
	infaq: asyncHandler(async (req: Request, res: Response) => {
		const result = await reportService.generateInfaqReport(
			parseDateRange(req),
			parseFormat(req),
		);
		send(res, result);
	}),
	pengeluaran: asyncHandler(async (req: Request, res: Response) => {
		const result = await reportService.generatePengeluaranReport(
			parseDateRange(req),
			parseFormat(req),
		);
		send(res, result);
	}),
	shohibulQurban: asyncHandler(async (req: Request, res: Response) => {
		const result = await reportService.generateShohibulQurbanReport({
			tahunHijriah:
				typeof req.query.tahun_hijriah === "string"
					? req.query.tahun_hijriah
					: undefined,
			jenisHewan:
				typeof req.query.jenis_hewan === "string"
					? req.query.jenis_hewan
					: undefined,
		});
		send(res, result);
	}),
	keuanganQurban: asyncHandler(async (req: Request, res: Response) => {
		const result = await reportService.generateKeuanganQurbanReport(
			parseDateRange(req),
		);
		send(res, result);
	}),
	nametagQurban: asyncHandler(async (req: Request, res: Response) => {
		const result = await reportService.generateQurbanNametags({
			tahunHijriah:
				typeof req.query.tahun_hijriah === "string"
					? req.query.tahun_hijriah
					: undefined,
			jenisHewan:
				typeof req.query.jenis_hewan === "string"
					? req.query.jenis_hewan
					: undefined,
		});
		send(res, result);
	}),
};
