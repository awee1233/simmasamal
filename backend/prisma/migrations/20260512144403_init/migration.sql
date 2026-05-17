-- CreateEnum
CREATE TYPE "Jabatan" AS ENUM ('Administrator', 'Bendahara DKM', 'Petugas Qurban');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jabatan" "Jabatan" NOT NULL DEFAULT 'Administrator',
    "email_verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muzakkis" (
    "id" SERIAL NOT NULL,
    "no_muzakki" VARCHAR(8) NOT NULL,
    "nama_muzakki" VARCHAR(80) NOT NULL,
    "telp_muzakki" VARCHAR(20) NOT NULL,
    "alamat_muzakki" TEXT NOT NULL,
    "tanggal_input" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muzakkis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mustahiks" (
    "id" SERIAL NOT NULL,
    "no_mustahik" VARCHAR(8) NOT NULL,
    "no_kk" VARCHAR(20) NOT NULL,
    "nama_mustahik" VARCHAR(80) NOT NULL,
    "alamat_mustahik" TEXT NOT NULL,
    "asnaf" VARCHAR(40) NOT NULL,
    "rt" VARCHAR(4) NOT NULL,
    "jumlah_anak" INTEGER NOT NULL DEFAULT 0,
    "tanggal_input" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mustahiks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zakats" (
    "id" SERIAL NOT NULL,
    "no_zakat" VARCHAR(20) NOT NULL,
    "tanggal_zakat" DATE NOT NULL,
    "jam_zakat" VARCHAR(20) NOT NULL,
    "petugas_penerima" VARCHAR(80) NOT NULL,
    "no_muzakki" VARCHAR(8) NOT NULL,
    "jenis_zakat" VARCHAR(30) NOT NULL,
    "jumlah_zakat" DECIMAL(15,2) NOT NULL,
    "berat_beras" DECIMAL(10,2),
    "jenis_bayar" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'success',
    "snap_token" TEXT,
    "payment_type" TEXT,
    "transaction_id" TEXT,
    "transaction_time" TEXT,
    "transaction_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zakats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penyalurans" (
    "no_penyaluran" VARCHAR(20) NOT NULL,
    "tanggal_penyaluran" DATE NOT NULL,
    "jam_penyaluran" VARCHAR(20) NOT NULL,
    "petugas_penyaluran" VARCHAR(80) NOT NULL,
    "jenis_zakat" VARCHAR(30) NOT NULL,
    "total_penyaluran" DECIMAL(15,2) NOT NULL,
    "beras_disalurkan" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status_penyaluran" VARCHAR(30) NOT NULL,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penyalurans_pkey" PRIMARY KEY ("no_penyaluran")
);

-- CreateTable
CREATE TABLE "penyaluran_penerimas" (
    "id" SERIAL NOT NULL,
    "no_penyaluran" VARCHAR(20) NOT NULL,
    "mustahik_id" INTEGER NOT NULL,
    "jumlah_terima" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "jumlah_terima_uang" DECIMAL(15,2),
    "jumlah_terima_beras" DECIMAL(10,2),
    "status_penerima" VARCHAR(30) NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penyaluran_penerimas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donaturs" (
    "id" SERIAL NOT NULL,
    "no_donatur" VARCHAR(20) NOT NULL,
    "nama" TEXT NOT NULL,
    "no_telepon" VARCHAR(25) NOT NULL,
    "email" TEXT,
    "pekerjaan" TEXT,
    "alamat" TEXT,
    "anonim" VARCHAR(10) NOT NULL DEFAULT 'tidak',
    "pesan_doa" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donaturs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "infaqs" (
    "id" SERIAL NOT NULL,
    "no_penerimaan" VARCHAR(30) NOT NULL,
    "tanggal" DATE NOT NULL,
    "waktu" VARCHAR(20) NOT NULL,
    "petugas_id" INTEGER,
    "donatur_id" INTEGER NOT NULL,
    "jenis_penerimaan" TEXT NOT NULL,
    "jumlah" DECIMAL(15,2) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'success',
    "snap_token" TEXT,
    "payment_type" TEXT,
    "transaction_id" TEXT,
    "transaction_time" TEXT,
    "transaction_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "infaqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengeluarans" (
    "id" SERIAL NOT NULL,
    "no_pengajuan" VARCHAR(30) NOT NULL,
    "tanggal" DATE NOT NULL,
    "nama_koordinator" TEXT NOT NULL,
    "koordinator_bidang" TEXT NOT NULL,
    "jenis_pengeluaran" TEXT NOT NULL,
    "jumlah" DECIMAL(15,2) NOT NULL,
    "keterangan" TEXT,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengeluarans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shohibul_qurbans" (
    "id" VARCHAR(40) NOT NULL,
    "tahun_hijriah" VARCHAR(10) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "nama" TEXT NOT NULL,
    "hp" VARCHAR(25) NOT NULL,
    "alamat" TEXT NOT NULL,
    "jenis_hewan" VARCHAR(40) NOT NULL,
    "berat" VARCHAR(20) NOT NULL,
    "bagian_diminta" TEXT NOT NULL,
    "tanggal" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shohibul_qurbans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shohibul_qurban_details" (
    "id" VARCHAR(40) NOT NULL,
    "sq_id" VARCHAR(40) NOT NULL,
    "nama" TEXT NOT NULL,
    "bin_or_binti" TEXT NOT NULL,
    "bin_or_binti_value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shohibul_qurban_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nasabah_qurban" (
    "id" VARCHAR(40) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "nama" TEXT NOT NULL,
    "hp" VARCHAR(25) NOT NULL,
    "alamat" TEXT NOT NULL,
    "ref_id" VARCHAR(12) NOT NULL,
    "target_hewan_id" VARCHAR(40),
    "total_tabungan" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "sisa_tabungan" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nasabah_qurban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harga_hewan_qurban" (
    "id" VARCHAR(40) NOT NULL,
    "jenis_hewan" TEXT NOT NULL,
    "harga" DECIMAL(15,2) NOT NULL,
    "tahun_hijriah" VARCHAR(10) NOT NULL,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "harga_hewan_qurban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabungan_qurban" (
    "id" VARCHAR(40) NOT NULL,
    "nasabah_id" VARCHAR(40) NOT NULL,
    "harga_hewan_id" VARCHAR(40) NOT NULL,
    "jumlah_setoran" DECIMAL(15,2) NOT NULL,
    "tanggal_setor" DATE NOT NULL,
    "keterangan" TEXT,
    "metode_pembayaran" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "transaction_status" TEXT,
    "transaction_id" TEXT,
    "transaction_time" TIMESTAMP(3),
    "order_id" TEXT,
    "payment_type" TEXT,
    "payment_time" TIMESTAMP(3),
    "snap_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tabungan_qurban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keuangan_qurban" (
    "id" VARCHAR(40) NOT NULL,
    "no_transaksi" VARCHAR(30) NOT NULL,
    "tanggal" DATE NOT NULL,
    "jenis" VARCHAR(30) NOT NULL,
    "jumlah" DECIMAL(15,2) NOT NULL,
    "keterangan" TEXT,
    "tabungan_qurban_id" VARCHAR(40),
    "harga_hewan_qurban_id" VARCHAR(40),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keuangan_qurban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penerima_qurban" (
    "id" VARCHAR(40) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "nama" TEXT NOT NULL,
    "tahun_hijriah" VARCHAR(10) NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "alamat" TEXT NOT NULL,
    "rt" VARCHAR(4) NOT NULL,
    "rw" VARCHAR(4) NOT NULL,
    "kategori" VARCHAR(40),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penerima_qurban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "petugas_qurban" (
    "id" VARCHAR(40) NOT NULL,
    "nik" VARCHAR(20) NOT NULL,
    "nama" TEXT NOT NULL,
    "tahun_hijriah" VARCHAR(10) NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "petugas_qurban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aturan_pembagians" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "produk" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aturan_pembagians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembagian_produks" (
    "id" SERIAL NOT NULL,
    "produk" TEXT NOT NULL,
    "berat" DECIMAL(10,2) NOT NULL,
    "total_bungkus" INTEGER NOT NULL,
    "berat_perproduk" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pembagian_produks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sholats" (
    "id" SERIAL NOT NULL,
    "nama_sholat" TEXT NOT NULL,
    "waktu_sholat" VARCHAR(10) NOT NULL,
    "waktu_iqomah" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sholats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kajians" (
    "id" SERIAL NOT NULL,
    "judul_kajian" TEXT NOT NULL,
    "deskripsi_kajian" TEXT NOT NULL,
    "tanggal_kajian" DATE NOT NULL,
    "foto_kajian" TEXT,
    "foto_ustad" TEXT,
    "nama_ustad" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kajians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kondisi" VARCHAR(20) NOT NULL DEFAULT 'Baik',
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "jumlah_baik" INTEGER NOT NULL DEFAULT 0,
    "jumlah_rusak" INTEGER NOT NULL DEFAULT 0,
    "jumlah_hilang" INTEGER NOT NULL DEFAULT 0,
    "gambar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "muzakkis_no_muzakki_key" ON "muzakkis"("no_muzakki");

-- CreateIndex
CREATE UNIQUE INDEX "mustahiks_no_mustahik_key" ON "mustahiks"("no_mustahik");

-- CreateIndex
CREATE UNIQUE INDEX "zakats_no_zakat_key" ON "zakats"("no_zakat");

-- CreateIndex
CREATE UNIQUE INDEX "donaturs_no_donatur_key" ON "donaturs"("no_donatur");

-- CreateIndex
CREATE UNIQUE INDEX "infaqs_no_penerimaan_key" ON "infaqs"("no_penerimaan");

-- AddForeignKey
ALTER TABLE "zakats" ADD CONSTRAINT "zakats_no_muzakki_fkey" FOREIGN KEY ("no_muzakki") REFERENCES "muzakkis"("no_muzakki") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penyaluran_penerimas" ADD CONSTRAINT "penyaluran_penerimas_no_penyaluran_fkey" FOREIGN KEY ("no_penyaluran") REFERENCES "penyalurans"("no_penyaluran") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penyaluran_penerimas" ADD CONSTRAINT "penyaluran_penerimas_mustahik_id_fkey" FOREIGN KEY ("mustahik_id") REFERENCES "mustahiks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infaqs" ADD CONSTRAINT "infaqs_petugas_id_fkey" FOREIGN KEY ("petugas_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infaqs" ADD CONSTRAINT "infaqs_donatur_id_fkey" FOREIGN KEY ("donatur_id") REFERENCES "donaturs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengeluarans" ADD CONSTRAINT "pengeluarans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shohibul_qurban_details" ADD CONSTRAINT "shohibul_qurban_details_sq_id_fkey" FOREIGN KEY ("sq_id") REFERENCES "shohibul_qurbans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nasabah_qurban" ADD CONSTRAINT "nasabah_qurban_target_hewan_id_fkey" FOREIGN KEY ("target_hewan_id") REFERENCES "harga_hewan_qurban"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabungan_qurban" ADD CONSTRAINT "tabungan_qurban_nasabah_id_fkey" FOREIGN KEY ("nasabah_id") REFERENCES "nasabah_qurban"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabungan_qurban" ADD CONSTRAINT "tabungan_qurban_harga_hewan_id_fkey" FOREIGN KEY ("harga_hewan_id") REFERENCES "harga_hewan_qurban"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
