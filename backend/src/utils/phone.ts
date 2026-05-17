/**
 * Format phone number to Indonesian international format (62...).
 * Accepts numbers like "08123456789", "8123456789", "+628123456789", or "628123456789".
 */
export function formatIndonesianPhone(input: string): string {
	const trimmed = input.replace(/[^\d+]/g, "");
	if (!trimmed) return input;

	let cleaned = trimmed.replace(/^\+/, "");
	if (cleaned.startsWith("0")) {
		cleaned = `62${cleaned.slice(1)}`;
	} else if (cleaned.startsWith("8")) {
		cleaned = `62${cleaned}`;
	} else if (!cleaned.startsWith("62")) {
		cleaned = `62${cleaned}`;
	}
	return cleaned;
}
