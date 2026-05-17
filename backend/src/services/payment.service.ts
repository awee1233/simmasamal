import { prisma } from "@/lib/prisma";
import { midtransService } from "@/services/midtrans.service";
import { whatsappService } from "@/services/whatsapp.service";

interface CreatePaymentInput {
	orderId: string;
	grossAmount: number;
	customer: {
		first_name?: string;
		email?: string;
		phone?: string;
	};
	itemName: string;
}

async function createSnap(input: CreatePaymentInput) {
	return midtransService.createSnapToken(
		{ orderId: input.orderId, grossAmount: input.grossAmount },
		input.customer,
		[
			{
				id: input.orderId,
				price: Math.round(input.grossAmount),
				quantity: 1,
				name: input.itemName,
			},
		],
	);
}

export const paymentService = {
	async createInfaqSnap(infaqId: number) {
		const infaq = await prisma.infaq.findUnique({
			where: { id: infaqId },
			include: { donatur: true },
		});
		if (!infaq) throw new Error("Infaq not found");
		const orderId = `INFAQ-${infaq.noPenerimaan}`;
		const snap = await createSnap({
			orderId,
			grossAmount: Number(infaq.jumlah),
			customer: {
				first_name: infaq.donatur.nama,
				email: infaq.donatur.email ?? undefined,
				phone: infaq.donatur.noTelepon,
			},
			itemName: `Infaq ${infaq.jenisPenerimaan}`,
		});
		await prisma.infaq.update({
			where: { id: infaq.id },
			data: { snapToken: snap.token, status: "pending" },
		});
		return { ...snap, orderId };
	},

	async createZakatSnap(zakatId: number) {
		const zakat = await prisma.zakat.findUnique({
			where: { id: zakatId },
			include: { muzakki: true },
		});
		if (!zakat) throw new Error("Zakat not found");
		const orderId = `ZAKAT-${zakat.noZakat}`;
		const snap = await createSnap({
			orderId,
			grossAmount: Number(zakat.jumlahZakat),
			customer: {
				first_name: zakat.muzakki.namaMuzakki,
				phone: zakat.muzakki.telpMuzakki,
			},
			itemName: zakat.jenisZakat,
		});
		await prisma.zakat.update({
			where: { id: zakat.id },
			data: { snapToken: snap.token, status: "pending" },
		});
		return { ...snap, orderId };
	},

	async createTabunganSnap(tabunganId: string) {
		const tabungan = await prisma.tabunganQurban.findUnique({
			where: { id: tabunganId },
			include: { nasabah: true, hargaHewan: true },
		});
		if (!tabungan) throw new Error("Tabungan qurban not found");
		const orderId = `TABUNGAN-${tabungan.id}`;
		const snap = await createSnap({
			orderId,
			grossAmount: Number(tabungan.jumlahSetoran),
			customer: {
				first_name: tabungan.nasabah.nama,
				phone: tabungan.nasabah.hp,
			},
			itemName: `Tabungan Qurban ${tabungan.hargaHewan.jenisHewan}`,
		});
		await prisma.tabunganQurban.update({
			where: { id: tabungan.id },
			data: {
				snapToken: snap.token,
				orderId,
				status: "pending",
				metodePembayaran: tabungan.metodePembayaran ?? "Midtrans",
			},
		});
		return { ...snap, orderId };
	},

	async handleInfaqNotification(payload: Record<string, unknown>) {
		const parsed = midtransService.parseNotification(payload);
		const noPenerimaan = parsed.orderId.replace(/^INFAQ-/, "");
		const infaq = await prisma.infaq.findUnique({
			where: { noPenerimaan },
			include: { donatur: true },
		});
		if (!infaq) return { ok: false, reason: "infaq_not_found" };
		const updated = await prisma.infaq.update({
			where: { id: infaq.id },
			data: {
				status: parsed.transactionStatus,
				paymentType: parsed.paymentType,
				transactionId: parsed.transactionId,
				transactionTime: parsed.transactionTime,
				transactionStatus: parsed.rawTransactionStatus,
			},
		});
		if (parsed.transactionStatus === "success") {
			await whatsappService.sendTransactionConfirmation(
				infaq.donatur.noTelepon,
				{
					tanggal: updated.tanggal.toISOString().slice(0, 10),
					jumlah: Number(updated.jumlah),
					noPenerimaan: updated.noPenerimaan,
					metodePembayaran: parsed.paymentType,
					jenis: "infaq",
					nama: infaq.donatur.nama,
				},
			);
		}
		return { ok: true, status: parsed.transactionStatus };
	},

	async handleZakatNotification(payload: Record<string, unknown>) {
		const parsed = midtransService.parseNotification(payload);
		const noZakat = parsed.orderId.replace(/^ZAKAT-/, "");
		const zakat = await prisma.zakat.findUnique({
			where: { noZakat },
			include: { muzakki: true },
		});
		if (!zakat) return { ok: false, reason: "zakat_not_found" };
		const updated = await prisma.zakat.update({
			where: { id: zakat.id },
			data: {
				status: parsed.transactionStatus,
				paymentType: parsed.paymentType,
				transactionId: parsed.transactionId,
				transactionTime: parsed.transactionTime,
				transactionStatus: parsed.rawTransactionStatus,
			},
		});
		if (parsed.transactionStatus === "success" && zakat.muzakki?.telpMuzakki) {
			await whatsappService.sendTransactionConfirmation(
				zakat.muzakki.telpMuzakki,
				{
					tanggal: updated.tanggalZakat.toISOString().slice(0, 10),
					jumlah: Number(updated.jumlahZakat),
					noPenerimaan: updated.noZakat,
					metodePembayaran: parsed.paymentType,
					jenis: "zakat",
					nama: zakat.muzakki.namaMuzakki,
				},
			);
		}
		return { ok: true, status: parsed.transactionStatus };
	},

	async handleTabunganNotification(payload: Record<string, unknown>) {
		const parsed = midtransService.parseNotification(payload);
		const tabunganId = parsed.orderId.replace(/^TABUNGAN-/, "");
		const tabungan = await prisma.tabunganQurban.findUnique({
			where: { id: tabunganId },
			include: { nasabah: true, hargaHewan: true },
		});
		if (!tabungan) return { ok: false, reason: "tabungan_not_found" };
		const updated = await prisma.tabunganQurban.update({
			where: { id: tabungan.id },
			data: {
				status: parsed.transactionStatus,
				paymentType: parsed.paymentType,
				transactionId: parsed.transactionId,
				transactionStatus: parsed.rawTransactionStatus,
			},
			include: { nasabah: true, hargaHewan: true },
		});
		if (parsed.transactionStatus === "success" && tabungan.nasabah.hp) {
			await whatsappService.sendTransactionConfirmation(tabungan.nasabah.hp, {
				tanggal: updated.tanggalSetor.toISOString().slice(0, 10),
				jumlah: Number(updated.jumlahSetoran),
				noPenerimaan: tabungan.id.slice(0, 12),
				metodePembayaran: parsed.paymentType,
				jenis: "tabungan qurban",
				nama: tabungan.nasabah.nama,
			});
		}
		return { ok: true, status: parsed.transactionStatus };
	},
};
