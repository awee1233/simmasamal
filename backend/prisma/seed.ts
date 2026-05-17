import { PrismaClient, Jabatan } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Users
  const hashedPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@simmasamal.com' },
    update: {},
    create: {
      name: 'Administrator',
      email: 'admin@simmasamal.com',
      password: hashedPassword,
      jabatan: Jabatan.Administrator,
      emailVerifiedAt: new Date(),
    },
  });

  const bendahara = await prisma.user.upsert({
    where: { email: 'bendahara@simmasamal.com' },
    update: {},
    create: {
      name: 'H. Ahmad Fauzi',
      email: 'bendahara@simmasamal.com',
      password: hashedPassword,
      jabatan: Jabatan.Bendahara_DKM,
      emailVerifiedAt: new Date(),
    },
  });

  const petugas = await prisma.user.upsert({
    where: { email: 'petugas@simmasamal.com' },
    update: {},
    create: {
      name: 'Muhammad Rizki',
      email: 'petugas@simmasamal.com',
      password: hashedPassword,
      jabatan: Jabatan.Petugas_Qurban,
      emailVerifiedAt: new Date(),
    },
  });
  console.log('✅ Users created');

  // 2. Muzakki
  const muzakkiData = [
    { noMuzakki: 'MZK00001', namaMuzakki: 'H. Budi Santoso', telpMuzakki: '081234567890', alamatMuzakki: 'Jl. Merdeka No. 10, RT 01/RW 02' },
    { noMuzakki: 'MZK00002', namaMuzakki: 'Hj. Siti Aminah', telpMuzakki: '081234567891', alamatMuzakki: 'Jl. Sudirman No. 25, RT 03/RW 01' },
    { noMuzakki: 'MZK00003', namaMuzakki: 'Abdullah Rahman', telpMuzakki: '081234567892', alamatMuzakki: 'Jl. Diponegoro No. 5, RT 02/RW 03' },
    { noMuzakki: 'MZK00004', namaMuzakki: 'H. Imam Syafi\'i', telpMuzakki: '081234567893', alamatMuzakki: 'Jl. Gatot Subroto No. 15, RT 04/RW 02' },
    { noMuzakki: 'MZK00005', namaMuzakki: 'Fatimah Zahra', telpMuzakki: '081234567894', alamatMuzakki: 'Jl. Ahmad Yani No. 8, RT 01/RW 04' },
  ];
  for (const m of muzakkiData) {
    await prisma.muzakki.upsert({ where: { noMuzakki: m.noMuzakki }, update: {}, create: { ...m, tanggalInput: new Date() } });
  }
  console.log('✅ Muzakki created');

  // 3. Mustahik
  const mustahikData = [
    { noMustahik: 'MST00001', noKk: '3201234567890001', namaMustahik: 'Ahmad Fadillah', alamatMustahik: 'Jl. Kebon Jeruk No. 3', asnaf: 'Fakir', rt: '01', jumlahAnak: 3 },
    { noMustahik: 'MST00002', noKk: '3201234567890002', namaMustahik: 'Maria Ulfah', alamatMustahik: 'Jl. Mangga No. 7', asnaf: 'Miskin', rt: '02', jumlahAnak: 2 },
    { noMustahik: 'MST00003', noKk: '3201234567890003', namaMustahik: 'Dedi Kurniawan', alamatMustahik: 'Jl. Anggur No. 12', asnaf: 'Amil', rt: '03', jumlahAnak: 1 },
    { noMustahik: 'MST00004', noKk: '3201234567890004', namaMustahik: 'Rina Wati', alamatMustahik: 'Jl. Durian No. 5', asnaf: 'Muallaf', rt: '01', jumlahAnak: 4 },
    { noMustahik: 'MST00005', noKk: '3201234567890005', namaMustahik: 'H. Soleh', alamatMustahik: 'Jl. Rambutan No. 9', asnaf: 'Gharimin', rt: '04', jumlahAnak: 2 },
  ];
  for (const m of mustahikData) {
    await prisma.mustahik.upsert({ where: { noMustahik: m.noMustahik }, update: {}, create: { ...m, tanggalInput: new Date() } });
  }
  console.log('✅ Mustahik created');

  // 4. Zakat
  const zakatData = [
    { noZakat: 'ZKT-2026-0001', tanggalZakat: new Date('2026-03-15'), jamZakat: '09:00', petugasPenerima: 'Muhammad Rizki', noMuzakki: 'MZK00001', jenisZakat: 'Zakat Mal', jumlahZakat: 5000000, jenisBayar: 'Tunai' },
    { noZakat: 'ZKT-2026-0002', tanggalZakat: new Date('2026-03-20'), jamZakat: '10:30', petugasPenerima: 'Muhammad Rizki', noMuzakki: 'MZK00002', jenisZakat: 'Zakat Fitrah', jumlahZakat: 150000, beratBeras: 2.5, jenisBayar: 'Beras' },
    { noZakat: 'ZKT-2026-0003', tanggalZakat: new Date('2026-04-01'), jamZakat: '14:00', petugasPenerima: 'H. Ahmad Fauzi', noMuzakki: 'MZK00003', jenisZakat: 'Zakat Mal', jumlahZakat: 3500000, jenisBayar: 'Transfer' },
    { noZakat: 'ZKT-2026-0004', tanggalZakat: new Date('2026-04-10'), jamZakat: '08:15', petugasPenerima: 'Muhammad Rizki', noMuzakki: 'MZK00004', jenisZakat: 'Zakat Mal', jumlahZakat: 7500000, jenisBayar: 'Tunai' },
    { noZakat: 'ZKT-2026-0005', tanggalZakat: new Date('2026-05-01'), jamZakat: '11:00', petugasPenerima: 'H. Ahmad Fauzi', noMuzakki: 'MZK00005', jenisZakat: 'Zakat Fitrah', jumlahZakat: 200000, beratBeras: 3.0, jenisBayar: 'Beras' },
  ];
  for (const z of zakatData) {
    await prisma.zakat.upsert({ where: { noZakat: z.noZakat }, update: {}, create: z });
  }
  console.log('✅ Zakat created');

  // 5. Penyaluran
  const penyaluran = await prisma.penyaluran.create({
    data: {
      noPenyaluran: 'PNY-2026-0001',
      tanggalPenyaluran: new Date('2026-04-15'),
      jamPenyaluran: '09:00',
      petugasPenyaluran: 'Muhammad Rizki',
      jenisZakat: 'Zakat Mal',
      totalPenyaluran: 8500000,
      berasDisalurkan: 0,
      statusPenyaluran: 'Selesai',
      keterangan: 'Penyaluran zakat mal bulan April',
    },
  });

  await prisma.penyaluranPenerima.createMany({
    data: [
      { noPenyaluran: 'PNY-2026-0001', mustahikId: 1, jumlahTerima: 2000000, jumlahTerimaUang: 2000000, statusPenerima: 'diterima' },
      { noPenyaluran: 'PNY-2026-0001', mustahikId: 2, jumlahTerima: 2000000, jumlahTerimaUang: 2000000, statusPenerima: 'diterima' },
      { noPenyaluran: 'PNY-2026-0001', mustahikId: 3, jumlahTerima: 1500000, jumlahTerimaUang: 1500000, statusPenerima: 'diterima' },
      { noPenyaluran: 'PNY-2026-0001', mustahikId: 4, jumlahTerima: 1500000, jumlahTerimaUang: 1500000, statusPenerima: 'diterima' },
      { noPenyaluran: 'PNY-2026-0001', mustahikId: 5, jumlahTerima: 1500000, jumlahTerimaUang: 1500000, statusPenerima: 'pending' },
    ],
  });
  console.log('✅ Penyaluran created');

  // 6. Donatur
  const donaturData = [
    { noDonatur: 'DNT-00001', nama: 'H. Budi Santoso', noTelepon: '081234567890', email: 'budi@email.com', pekerjaan: 'Wiraswasta', alamat: 'Jl. Merdeka No. 10' },
    { noDonatur: 'DNT-00002', nama: 'PT. Berkah Jaya', noTelepon: '081234567895', email: 'berkah@email.com', pekerjaan: 'Perusahaan', alamat: 'Jl. Industri No. 100' },
    { noDonatur: 'DNT-00003', nama: 'Anonim', noTelepon: '081234567896', anonim: 'ya' },
    { noDonatur: 'DNT-00004', nama: 'Hj. Siti Aminah', noTelepon: '081234567891', email: 'siti@email.com', pekerjaan: 'Guru', alamat: 'Jl. Sudirman No. 25' },
  ];
  for (const d of donaturData) {
    await prisma.donatur.upsert({ where: { noDonatur: d.noDonatur }, update: {}, create: d });
  }
  console.log('✅ Donatur created');

  // 7. Infaq
  const infaqData = [
    { noPenerimaan: 'INF-2026-00001', tanggal: new Date('2026-03-10'), waktu: '08:00', petugasId: admin.id, donaturId: 1, jenisPenerimaan: 'Infaq Jumat', jumlah: 2500000 },
    { noPenerimaan: 'INF-2026-00002', tanggal: new Date('2026-03-17'), waktu: '08:30', petugasId: bendahara.id, donaturId: 2, jenisPenerimaan: 'Infaq Pembangunan', jumlah: 10000000 },
    { noPenerimaan: 'INF-2026-00003', tanggal: new Date('2026-03-24'), waktu: '07:45', petugasId: admin.id, donaturId: 3, jenisPenerimaan: 'Infaq Jumat', jumlah: 500000 },
    { noPenerimaan: 'INF-2026-00004', tanggal: new Date('2026-04-05'), waktu: '09:00', petugasId: bendahara.id, donaturId: 4, jenisPenerimaan: 'Infaq Sosial', jumlah: 1500000 },
  ];
  for (const i of infaqData) {
    await prisma.infaq.upsert({ where: { noPenerimaan: i.noPenerimaan }, update: {}, create: i });
  }
  console.log('✅ Infaq created');

  // 8. Pengeluaran
  const pengeluaranData = [
    { noPengajuan: 'PNG-2026-0001', tanggal: new Date('2026-03-15'), namaKoordinator: 'H. Ahmad Fauzi', koordinatorBidang: 'Keuangan', jenisPengeluaran: 'Operasional', jumlah: 500000, keterangan: 'Beli ATK masjid', userId: bendahara.id },
    { noPengajuan: 'PNG-2026-0002', tanggal: new Date('2026-03-20'), namaKoordinator: 'Muhammad Rizki', koordinatorBidang: 'Sosial', jenisPengeluaran: 'Sosial', jumlah: 1000000, keterangan: 'Bantuan bencana alam', userId: petugas.id },
    { noPengajuan: 'PNG-2026-0003', tanggal: new Date('2026-04-01'), namaKoordinator: 'H. Ahmad Fauzi', koordinatorBidang: 'Keuangan', jenisPengeluaran: 'Pemeliharaan', jumlah: 750000, keterangan: 'Service AC masjid', userId: bendahara.id },
  ];
  for (const p of pengeluaranData) {
    await prisma.pengeluaran.create({ data: p });
  }
  console.log('✅ Pengeluaran created');

  // 9. Sholat schedule
  const sholatData = [
    { namaSholat: 'Subuh', waktuSholat: '04:30', waktuIqomah: '04:45' },
    { namaSholat: 'Dzuhur', waktuSholat: '11:45', waktuIqomah: '12:00' },
    { namaSholat: 'Ashar', waktuSholat: '15:00', waktuIqomah: '15:15' },
    { namaSholat: 'Maghrib', waktuSholat: '17:45', waktuIqomah: '17:55' },
    { namaSholat: 'Isya', waktuSholat: '19:00', waktuIqomah: '19:15' },
    { namaSholat: 'Jumat', waktuSholat: '11:30', waktuIqomah: '12:00' },
  ];
  for (const s of sholatData) {
    await prisma.sholat.create({ data: s });
  }
  console.log('✅ Sholat schedule created');

  // 10. Kajian
  const kajianData = [
    { judulKajian: 'Fiqih Puasa Ramadhan', deskripsiKajian: 'Kajian tentang hukum dan tata cara puasa Ramadhan', tanggalKajian: new Date('2026-03-01'), namaUstad: 'Ustadz Abdul Somad' },
    { judulKajian: 'Keutamaan Sedekah', deskripsiKajian: 'Membahas keutamaan dan manfaat sedekah dalam Islam', tanggalKajian: new Date('2026-03-15'), namaUstad: 'Ustadz Adi Hidayat' },
    { judulKajian: 'Fiqih Qurban', deskripsiKajian: 'Panduan lengkap tentang hukum dan pelaksanaan qurban', tanggalKajian: new Date('2026-05-10'), namaUstad: 'Ustadz Khalid Basalamah' },
  ];
  for (const k of kajianData) {
    await prisma.kajian.create({ data: k });
  }
  console.log('✅ Kajian created');

  // 11. Inventory
  const inventoryData = [
    { nama: 'Sajadah', kondisi: 'Baik', quantity: 50, jumlahBaik: 45, jumlahRusak: 5, jumlahHilang: 0 },
    { nama: 'Al-Quran', kondisi: 'Baik', quantity: 30, jumlahBaik: 28, jumlahRusak: 2, jumlahHilang: 0 },
    { nama: 'Karpet Masjid', kondisi: 'Baik', quantity: 20, jumlahBaik: 18, jumlahRusak: 2, jumlahHilang: 0 },
    { nama: 'Kipas Angin', kondisi: 'Baik', quantity: 10, jumlahBaik: 8, jumlahRusak: 2, jumlahHilang: 0 },
    { nama: 'Speaker', kondisi: 'Baik', quantity: 4, jumlahBaik: 4, jumlahRusak: 0, jumlahHilang: 0 },
  ];
  for (const inv of inventoryData) {
    await prisma.inventory.create({ data: inv });
  }
  console.log('✅ Inventory created');

  // 12. Qurban - Harga Hewan
  const hargaHewan = [
    { id: 'HH-001', jenisHewan: 'Sapi', harga: 18000000, tahunHijriah: '1447 H', keterangan: 'Sapi kurban ukuran sedang' },
    { id: 'HH-002', jenisHewan: 'Kambing', harga: 2500000, tahunHijriah: '1447 H', keterangan: 'Kambing kurban ukuran standar' },
    { id: 'HH-003', jenisHewan: 'Sapi Premium', harga: 25000000, tahunHijriah: '1447 H', keterangan: 'Sapi kurban ukuran besar' },
  ];
  for (const h of hargaHewan) {
    await prisma.hargaHewanQurban.upsert({ where: { id: h.id }, update: {}, create: h });
  }
  console.log('✅ Harga Hewan Qurban created');

  // 13. Shohibul Qurban
  const shohibulData = [
    { id: 'SQ-001', tahunHijriah: '1447 H', nik: '3201234567890001', nama: 'H. Budi Santoso', hp: '081234567890', alamat: 'Jl. Merdeka No. 10', jenisHewan: 'Sapi', berat: '250 kg', bagianDiminta: '1/7', tanggal: '2026-06-07' },
    { id: 'SQ-002', tahunHijriah: '1447 H', nik: '3201234567890002', nama: 'Hj. Siti Aminah', hp: '081234567891', alamat: 'Jl. Sudirman No. 25', jenisHewan: 'Kambing', berat: '30 kg', bagianDiminta: '1', tanggal: '2026-06-07' },
    { id: 'SQ-003', tahunHijriah: '1447 H', nik: '3201234567890004', nama: 'H. Imam Syafi\'i', hp: '081234567893', alamat: 'Jl. Gatot Subroto No. 15', jenisHewan: 'Sapi', berat: '280 kg', bagianDiminta: '1/7', tanggal: '2026-06-07' },
  ];
  for (const sq of shohibulData) {
    await prisma.shohibulQurban.upsert({ where: { id: sq.id }, update: {}, create: sq });
  }
  console.log('✅ Shohibul Qurban created');

  // 14. Penerima Qurban
  const penerimaQurbanData = [
    { id: 'PQ-001', nik: '3201234567890010', nama: 'Ahmad Fadillah', tahunHijriah: '1447 H', status: 'Fakir', alamat: 'Jl. Kebon Jeruk No. 3', rt: '01', rw: '02', kategori: 'Fakir Miskin' },
    { id: 'PQ-002', nik: '3201234567890011', nama: 'Maria Ulfah', tahunHijriah: '1447 H', status: 'Miskin', alamat: 'Jl. Mangga No. 7', rt: '02', rw: '01', kategori: 'Fakir Miskin' },
    { id: 'PQ-003', nik: '3201234567890012', nama: 'Rina Wati', tahunHijriah: '1447 H', status: 'Muallaf', alamat: 'Jl. Durian No. 5', rt: '01', rw: '04', kategori: 'Muallaf' },
  ];
  for (const pq of penerimaQurbanData) {
    await prisma.penerimaQurban.upsert({ where: { id: pq.id }, update: {}, create: pq });
  }
  console.log('✅ Penerima Qurban created');

  // 15. Petugas Qurban
  const petugasQurbanData = [
    { id: 'PTQ-001', nik: '3201234567890020', nama: 'Muhammad Rizki', tahunHijriah: '1447 H', status: 'Aktif' },
    { id: 'PTQ-002', nik: '3201234567890021', nama: 'Ahmad Fauzi', tahunHijriah: '1447 H', status: 'Aktif' },
  ];
  for (const ptq of petugasQurbanData) {
    await prisma.petugasQurban.upsert({ where: { id: ptq.id }, update: {}, create: ptq });
  }
  console.log('✅ Petugas Qurban created');

  // 16. Nasabah Qurban (Tabungan)
  const nasabah = await prisma.nasabahQurban.create({
    data: {
      id: 'NSB-001',
      nik: '3201234567890030',
      nama: 'Abdul Rozak',
      hp: '081234567899',
      alamat: 'Jl. Mawar No. 15',
      refId: 'REF001',
      targetHewanId: 'HH-001',
      totalTabungan: 5000000,
      sisaTabungan: 13000000,
    },
  });

  await prisma.tabunganQurban.create({
    data: {
      id: 'TBQ-001',
      nasabahId: 'NSB-001',
      hargaHewanId: 'HH-001',
      jumlahSetoran: 5000000,
      tanggalSetor: new Date('2026-03-01'),
      keterangan: 'Setoran awal tabungan qurban sapi',
      metodePembayaran: 'Transfer',
      status: 'success',
    },
  });
  console.log('✅ Nasabah & Tabungan Qurban created');

  // 17. Aturan Pembagian
  await prisma.aturanPembagian.createMany({
    data: [
      { status: 'Fakir', produk: 'Daging + Tulang' },
      { status: 'Miskin', produk: 'Daging' },
      { status: 'Amil', produk: 'Daging + Kulit' },
      { status: 'Muallaf', produk: 'Daging' },
    ],
  });
  console.log('✅ Aturan Pembagian created');

  // 18. Pembagian Produk
  await prisma.pembagianProduk.createMany({
    data: [
      { produk: 'Daging Sapi', berat: 500, totalBungkus: 100, beratPerproduk: 0.5 },
      { produk: 'Tulang Sapi', berat: 100, totalBungkus: 50, beratPerproduk: 2.0 },
      { produk: 'Daging Kambing', berat: 25, totalBungkus: 25, beratPerproduk: 1.0 },
    ],
  });
  console.log('✅ Pembagian Produk created');

  console.log('\n🎉 Seeding completed!');
  console.log('\n📋 Login credentials:');
  console.log('  admin@simmasamal.com / password123 (Administrator)');
  console.log('  bendahara@simmasamal.com / password123 (Bendahara DKM)');
  console.log('  petugas@simmasamal.com / password123 (Petugas Qurban)');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
