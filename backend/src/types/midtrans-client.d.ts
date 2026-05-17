declare module "midtrans-client" {
	export interface SnapOptions {
		isProduction: boolean;
		serverKey: string;
		clientKey: string;
	}

	export interface SnapTransactionOptions {
		transaction_details: {
			order_id: string;
			gross_amount: number;
		};
		customer_details?: Record<string, unknown>;
		item_details?: Array<Record<string, unknown>>;
		credit_card?: Record<string, unknown>;
		[key: string]: unknown;
	}

	export class Snap {
		constructor(options: SnapOptions);
		createTransaction(
			parameter: SnapTransactionOptions,
		): Promise<{ token: string; redirect_url: string }>;
		createTransactionToken(parameter: SnapTransactionOptions): Promise<string>;
		transaction: {
			notification(notification: unknown): Promise<Record<string, unknown>>;
			status(orderId: string): Promise<Record<string, unknown>>;
		};
	}

	export class CoreApi {
		constructor(options: SnapOptions);
		transaction: {
			notification(notification: unknown): Promise<Record<string, unknown>>;
			status(orderId: string): Promise<Record<string, unknown>>;
		};
	}
}
