import { createHash } from "node:crypto";
import midtransClient from "midtrans-client";
import { env } from "@/lib/env";

export interface OrderDetails {
	orderId: string;
	grossAmount: number;
}

export interface CustomerDetails {
	first_name?: string;
	last_name?: string;
	email?: string;
	phone?: string;
}

export interface ItemDetails {
	id: string;
	price: number;
	quantity: number;
	name: string;
}

export interface MidtransNotificationStatus {
	orderId: string;
	paymentType?: string;
	transactionId?: string;
	transactionTime?: string;
	transactionStatus: "success" | "pending" | "denied" | "expired" | "canceled";
	rawTransactionStatus: string;
	fraudStatus?: string;
	grossAmount?: string;
	signatureKey?: string;
}

type MidtransRaw = Record<string, unknown>;

function toStringOr(value: unknown, fallback = ""): string {
	return typeof value === "string" ? value : fallback;
}

/**
 * Map Midtrans raw transaction_status + fraud_status to our simplified enum.
 */
function mapStatus(
	txnStatus: string,
	fraudStatus?: string,
): MidtransNotificationStatus["transactionStatus"] {
	const s = txnStatus?.toLowerCase();
	if (s === "capture") {
		return fraudStatus === "challenge" ? "pending" : "success";
	}
	if (s === "settlement") return "success";
	if (s === "pending") return "pending";
	if (s === "deny") return "denied";
	if (s === "expire") return "expired";
	if (s === "cancel") return "canceled";
	return "pending";
}

/**
 * Verify Midtrans webhook signature_key.
 * Formula: sha512(order_id + status_code + gross_amount + server_key).
 */
export function verifySignature(payload: MidtransRaw): boolean {
	const orderId = toStringOr(payload.order_id);
	const statusCode = toStringOr(payload.status_code);
	const grossAmount = toStringOr(payload.gross_amount);
	const signature = toStringOr(payload.signature_key);
	if (!orderId || !statusCode || !grossAmount || !signature) return false;
	const expected = createHash("sha512")
		.update(`${orderId}${statusCode}${grossAmount}${env.midtrans.serverKey}`)
		.digest("hex");
	return expected === signature;
}

function snap() {
	return new midtransClient.Snap({
		isProduction: env.midtrans.isProduction,
		serverKey: env.midtrans.serverKey,
		clientKey: env.midtrans.clientKey,
	});
}

export const midtransService = {
	async createSnapToken(
		order: OrderDetails,
		customer: CustomerDetails,
		items: ItemDetails[],
	): Promise<{ token: string; redirectUrl: string }> {
		const tx = await snap().createTransaction({
			transaction_details: {
				order_id: order.orderId,
				gross_amount: Math.round(order.grossAmount),
			},
			customer_details: customer as unknown as Record<string, unknown>,
			item_details: items as unknown as Array<Record<string, unknown>>,
		});
		return { token: tx.token, redirectUrl: tx.redirect_url };
	},

	parseNotification(payload: MidtransRaw): MidtransNotificationStatus {
		const rawTxnStatus = toStringOr(payload.transaction_status);
		const fraudStatus = toStringOr(payload.fraud_status, undefined);
		return {
			orderId: toStringOr(payload.order_id),
			paymentType: toStringOr(payload.payment_type, undefined),
			transactionId: toStringOr(payload.transaction_id, undefined),
			transactionTime: toStringOr(payload.transaction_time, undefined),
			transactionStatus: mapStatus(rawTxnStatus, fraudStatus || undefined),
			rawTransactionStatus: rawTxnStatus,
			fraudStatus: fraudStatus || undefined,
			grossAmount: toStringOr(payload.gross_amount, undefined),
			signatureKey: toStringOr(payload.signature_key, undefined),
		};
	},
};
