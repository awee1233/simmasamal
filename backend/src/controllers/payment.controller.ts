import type { Request, Response } from "express";
import { paymentService } from "@/services/payment.service";
import { success } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { AppError } from "@/utils/errors";
import { verifySignature } from "@/services/midtrans.service";

function rejectInvalidSignature(payload: Record<string, unknown>) {
	if (!verifySignature(payload)) {
		throw new AppError("Invalid signature", 400);
	}
}

export const paymentController = {
	createInfaq: asyncHandler(async (req: Request, res: Response) => {
		const { infaqId } = req.body as { infaqId: number };
		const data = await paymentService.createInfaqSnap(Number(infaqId));
		return success(res, data);
	}),
	notifyInfaq: asyncHandler(async (req: Request, res: Response) => {
		rejectInvalidSignature(req.body);
		const data = await paymentService.handleInfaqNotification(req.body);
		return success(res, data);
	}),

	createZakat: asyncHandler(async (req: Request, res: Response) => {
		const { zakatId } = req.body as { zakatId: number };
		const data = await paymentService.createZakatSnap(Number(zakatId));
		return success(res, data);
	}),
	notifyZakat: asyncHandler(async (req: Request, res: Response) => {
		rejectInvalidSignature(req.body);
		const data = await paymentService.handleZakatNotification(req.body);
		return success(res, data);
	}),

	createTabungan: asyncHandler(async (req: Request, res: Response) => {
		const { tabunganId } = req.body as { tabunganId: string };
		const data = await paymentService.createTabunganSnap(String(tabunganId));
		return success(res, data);
	}),
	notifyTabungan: asyncHandler(async (req: Request, res: Response) => {
		rejectInvalidSignature(req.body);
		const data = await paymentService.handleTabunganNotification(req.body);
		return success(res, data);
	}),
};
