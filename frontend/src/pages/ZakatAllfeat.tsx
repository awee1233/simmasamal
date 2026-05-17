import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  Wallet,
  ArrowUpRight,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

export default function ZakatAllfeat() {
  const [activeTab, setActiveTab] = useState<'muzakki' | 'transaksi'>('transaksi');

  const muzakki = [
    { id: 'MZK00001', nama: 'H. Budi Santoso', telp: '081234567890', alamat: 'Jl. Merdeka No. 10' },
    { id: 'MZK00002', nama: 'Hj. Siti Aminah', telp: '081234567891', alamat: 'Jl. Sudirman No. 25' },
    { id: 'MZK00003', nama: 'Abdullah Rahman', telp: '081234567892', alamat: 'Jl. Diponegoro No. 5' },
    { id: 'MZK00004', nama: 'H. Imam Syafi\'i', telp: '081234567893', alamat: 'Jl. Gatot Subroto No. 15' },
    { id: 'MZK00005', nama: 'Fatimah Zahra', telp: '081234567894', alamat: 'Jl. Ahmad Yani No. 8' },
  ];

  const transaksi = [
    { no: 'ZKT-2026-0005', tanggal: '01 Mei 2026', muzakki: 'Fatimah Zahra', jenis: 'Zakat Fitrah', jumlah: 200000, bayar: 'Beras', status: 'success' },
    { no: 'ZKT-2026-0004', tanggal: '10 Apr 2026', muzakki: 'H. Imam Syafi\'i', jenis: 'Zakat Mal', jumlah: 7500000, bayar: 'Tunai', status: 'success' },
    { no: 'ZKT-2026-0003', tanggal: '01 Apr 2026', muzakki: 'Abdullah Rahman', jenis: 'Zakat Mal', jumlah: 3500000, bayar: 'Transfer', status: 'success' },
    { no: 'ZKT-2026-0002', tanggal: '20 Mar 2026', muzakki: 'Hj. Siti Aminah', jenis: 'Zakat Fitrah', jumlah: 150000, bayar: 'Beras', status: 'success' },
    { no: 'ZKT-2026-0001', tanggal: '15 Mar 2026', muzakki: 'H. Budi Santoso', jenis: 'Zakat Mal', jumlah: 5000000, bayar: 'Tunai', status: 'success' },
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-canvas-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <p className="text-slate-text text-sm tracking-wider uppercase">Zakat</p>
        <h1 className="text-whisper-white text-3xl font-semibold tracking-tight mt-1">
          Manajemen Zakat
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Total Zakat Terkumpul</p>
              <p className="text-whisper-white text-2xl font-semibold mt-1">Rp 16.350.000</p>
            </div>
            <div className="stat-icon">
              <Wallet size={24} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <ArrowUpRight size={14} className="text-cyber-teal" />
            <span className="text-cyber-teal text-xs">5 transaksi</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Zakat Mal</p>
              <p className="text-whisper-white text-2xl font-semibold mt-1">Rp 16.000.000</p>
            </div>
            <div className="stat-icon">
              <Wallet size={24} />
            </div>
          </div>
          <p className="text-ghost-gray text-xs mt-3">3 transaksi</p>
        </div>

        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Zakat Fitrah</p>
              <p className="text-whisper-white text-2xl font-semibold mt-1">Rp 350.000</p>
            </div>
            <div className="stat-icon" style={{ background: 'rgba(255, 74, 95, 0.1)' }}>
              <Wallet size={24} className="text-impact-red" />
            </div>
          </div>
          <p className="text-ghost-gray text-xs mt-3">2 transaksi • 5.5 kg beras</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('transaksi')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'transaksi'
              ? 'bg-cyber-teal text-canvas-dark'
              : 'bg-blueprint-gray text-whisper-white hover:bg-shadow-tint'
          }`}
        >
          Transaksi Zakat
        </button>
        <button
          onClick={() => setActiveTab('muzakki')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'muzakki'
              ? 'bg-cyber-teal text-canvas-dark'
              : 'bg-blueprint-gray text-whisper-white hover:bg-shadow-tint'
          }`}
        >
          Data Muzakki
        </button>
      </div>

      {/* Content */}
      <div className="card-inset">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ghost-gray" />
            <input
              type="text"
              placeholder={`Cari ${activeTab === 'transaksi' ? 'transaksi' : 'muzakki'}...`}
              className="input-dark w-full pl-10"
            />
          </div>
          <div className="flex gap-2">
            <button className="btn-accent flex items-center gap-2 text-sm">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button className="bg-blueprint-gray text-whisper-white rounded-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-shadow-tint transition-colors">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="btn-primary flex items-center gap-2 text-sm">
              <Plus size={16} />
              <span>{activeTab === 'transaksi' ? 'Tambah Zakat' : 'Tambah Muzakki'}</span>
            </button>
          </div>
        </div>

        {/* Table */}
        {activeTab === 'transaksi' ? (
          <table className="table-dark">
            <thead>
              <tr>
                <th>No. Zakat</th>
                <th>Tanggal</th>
                <th>Muzakki</th>
                <th>Jenis</th>
                <th>Jumlah</th>
                <th>Bayar</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((t, i) => (
                <tr key={i}>
                  <td className="text-whisper-white font-medium">{t.no}</td>
                  <td className="text-slate-text">{t.tanggal}</td>
                  <td className="text-whisper-white">{t.muzakki}</td>
                  <td><span className="badge">{t.jenis}</span></td>
                  <td className="text-whisper-white">{formatRupiah(t.jumlah)}</td>
                  <td className="text-slate-text">{t.bayar}</td>
                  <td><span className="badge-success">Berhasil</span></td>
                  <td>
                    <button className="p-1 rounded-lg hover:bg-blueprint-gray transition-colors">
                      <MoreVertical size={16} className="text-ghost-gray" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table-dark">
            <thead>
              <tr>
                <th>No. Muzakki</th>
                <th>Nama</th>
                <th>Telepon</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {muzakki.map((m, i) => (
                <tr key={i}>
                  <td className="text-whisper-white font-medium">{m.id}</td>
                  <td className="text-whisper-white">{m.nama}</td>
                  <td className="text-slate-text">{m.telp}</td>
                  <td className="text-slate-text">{m.alamat}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="p-2 rounded-lg hover:bg-blueprint-gray transition-colors" title="Lihat">
                        <Eye size={16} className="text-ghost-gray" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-blueprint-gray transition-colors" title="Edit">
                        <Edit size={16} className="text-ghost-gray" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-blueprint-gray transition-colors" title="Hapus">
                        <Trash2 size={16} className="text-impact-red" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-blueprint-gray">
          <p className="text-ghost-gray text-sm">
            Menampilkan 1-5 dari {activeTab === 'transaksi' ? '5' : '5'} data
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-lg bg-cyber-teal text-canvas-dark text-sm font-medium">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
