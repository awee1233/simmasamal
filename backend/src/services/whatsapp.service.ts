import axios from "axios";
import { env } from "@/lib/env";
import { formatIndonesianPhone } from "@/utils/phone";

export interface TransactionDetails {
	tanggal: string;
	jumlah: number;
	noPenerimaan: string;
	metodePembayaran?: string;
	jenis?: string;
	nama?: string;
}

export interface SendResult {
	success: boolean;
	skipped?: boolean;
	error?: string;
}

function formatIdr(value: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	}).format(value);
}

function buildMessage(details: TransactionDetails): string {
	const lines = [
		"Assalamu'alaikum warahmatullahi wabarakatuh",
		"",
		`Terima kasih${details.nama ? `, ${details.nama},` : ""} atas ${details.jenis ?? "donasi"} Anda di Masjid Khairul Amal.`,
		"",
		`Tanggal        : ${details.tanggal}`,
		`Jumlah         : ${formatIdr(details.jumlah)}`,
		`No. Penerimaan : ${details.noPenerimaan}`,
	];
	if (details.metodePembayaran) {
		lines.push(`Metode         : ${details.metodePembayaran}`);
	}
	lines.push(
		"",
		"Semoga Allah menerima amal baik Anda dan melimpahkan keberkahan.",
		"",
		"Wassalamu'alaikum warahmatullahi wabarakatuh.",
	);
	return lines.join("\n");
}

export const whatsappService = {
	formatPhoneNumber: formatIndonesianPhone,

	async sendTransactionConfirmation(
		phone: string | null | undefined,
		details: TransactionDetails,
	): Promise<SendResult> {
		if (!phone || phone.trim().length < 6) {
			// eslint-disable-next-line no-console
			console.warn(
				"[whatsapp] skipping send: missing phone for",
				details.noPenerimaan,
			);
			return { success: false, skipped: true };
		}
		const chatId = `${formatIndonesianPhone(phone)}@c.us`;
		try {
			await axios.post(
				`${env.waha.baseUrl.replace(/\/+$/, "")}/api/sendText`,
				{
					session: env.waha.session,
					chatId,
					text: buildMessage(details),
				},
				{
					headers: env.waha.apiKey
						? { "X-Api-Key": env.waha.apiKey }
						: undefined,
					timeout: 10_000,
				},
			);
			return { success: true };
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			// eslint-disable-next-line no-console
			console.error("[whatsapp] send failed:", message);
			return { success: false, error: message };
		}
	},
};
