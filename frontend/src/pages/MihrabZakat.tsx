import { useState } from 'react';
import { 
  Wallet, Search, Filter, Download, Plus,
  MapPin, Mail, ChevronRight,
  Facebook, Twitter, Instagram, Youtube,
  Eye, Edit, Trash2, MoreVertical, CheckCircle, LogIn
} from 'lucide-react';

export default function MihrabZakat() {
  const [activeTab, setActiveTab] = useState<'transaksi' | 'muzakki'>('transaksi');

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const transaksi = [
    { no: 'ZKT-2026-0005', tanggal: '01 Mei 2026', muzakki: 'Fatimah Zahra', jenis: 'Zakat Fitrah', jumlah: 200000, bayar: 'Beras', status: 'success' },
    { no: 'ZKT-2026-0004', tanggal: '10 Apr 2026', muzakki: 'H. Imam Syafi\'i', jenis: 'Zakat Mal', jumlah: 7500000, bayar: 'Tunai', status: 'success' },
    { no: 'ZKT-2026-0003', tanggal: '01 Apr 2026', muzakki: 'Abdullah Rahman', jenis: 'Zakat Mal', jumlah: 3500000, bayar: 'Transfer', status: 'success' },
    { no: 'ZKT-2026-0002', tanggal: '20 Mar 2026', muzakki: 'Hj. Siti Aminah', jenis: 'Zakat Fitrah', jumlah: 150000, bayar: 'Beras', status: 'success' },
    { no: 'ZKT-2026-0001', tanggal: '15 Mar 2026', muzakki: 'H. Budi Santoso', jenis: 'Zakat Mal', jumlah: 5000000, bayar: 'Tunai', status: 'success' },
  ];

  const muzakki = [
    { id: 'MZK00001', nama: 'H. Budi Santoso', telp: '081234567890', alamat: 'Jl. Merdeka No. 10' },
    { id: 'MZK00002', nama: 'Hj. Siti Aminah', telp: '081234567891', alamat: 'Jl. Sudirman No. 25' },
    { id: 'MZK00003', nama: 'Abdullah Rahman', telp: '081234567892', alamat: 'Jl. Diponegoro No. 5' },
    { id: 'MZK00004', nama: 'H. Imam Syafi\'i', telp: '081234567893', alamat: 'Jl. Gatot Subroto No. 15' },
    { id: 'MZK00005', nama: 'Fatimah Zahra', telp: '081234567894', alamat: 'Jl. Ahmad Yani No. 8' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      {/* Top Bar */}
      <div className="bg-[#042023] text-white/70 py-2 text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              Jl. Khairul Amal No. 10, Jakarta
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} />
              info@masjidkhairulamal.id
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#F5C50B] transition-colors"><Facebook size={14} /></a>
            <a href="#" className="hover:text-[#F5C50B] transition-colors"><Twitter size={14} /></a>
            <a href="#" className="hover:text-[#F5C50B] transition-colors"><Instagram size={14} /></a>
            <a href="#" className="hover:text-[#F5C50B] transition-colors"><Youtube size={14} /></a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar-islamic sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-3">
              <img src="/assets/img/logo.svg" alt="SIMMASAMAL" className="h-10" />
              <div>
                <h1 className="text-xl font-bold text-[#042023] leading-tight">SIMMASAMAL</h1>
                <p className="text-xs text-gray-500">Masjid Khairul Amal</p>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-2">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Zakat', href: '/zakat', active: true },
                { label: 'Infaq', href: '/infaq' },
                { label: 'Qurban', href: '/qurban' },
                { label: 'Kajian', href: '/kajian' },
                { label: 'Jadwal Sholat', href: '/sholat' },
                { label: 'Kontak', href: '/kontak' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`nav-link ${item.active ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a href="/login" className="hidden sm:flex btn-outline !py-2.5 !px-5 text-sm">
                <LogIn size={16} />
                Masuk
              </a>
              <a href="/zakat" className="btn-primary !py-2.5 !px-5 text-sm">
                <Wallet size={16} />
                Bayar Zakat
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-[#042023] to-[#0a3d2a] py-16 overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <img src="/assets/img/icons/title-white.svg" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <a href="/" className="hover:text-white">Beranda</a>
            <ChevronRight size={14} />
            <span className="text-white">Zakat</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Manajemen Zakat</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Kelola dan salurkan zakat Anda dengan mudah dan transparan melalui sistem kami
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card-gradient !bg-gradient-to-r from-[#1D8E5A] to-[#166B44]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <Wallet size={28} className="text-white" />
              </div>
            </div>
            <p className="text-white/80 text-sm mb-1">Total Zakat Terkumpul</p>
            <p className="text-3xl font-bold text-white">Rp 16.350.000</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white">5 transaksi</span>
            </div>
          </div>

          <div className="card-islamic">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                <Wallet size={28} className="text-blue-500" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Zakat Mal</p>
            <p className="text-3xl font-bold text-[#222]">Rp 16.000.000</p>
            <p className="text-gray-400 text-sm mt-2">3 transaksi</p>
          </div>

          <div className="card-islamic">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center">
                <Wallet size={28} className="text-amber-500" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Zakat Fitrah</p>
            <p className="text-3xl font-bold text-[#222]">Rp 350.000</p>
            <p className="text-gray-400 text-sm mt-2">2 transaksi • 5.5 kg beras</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('transaksi')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'transaksi'
                ? 'bg-[#1D8E5A] text-white shadow-lg shadow-emerald-500/30'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Transaksi Zakat
          </button>
          <button
            onClick={() => setActiveTab('muzakki')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'muzakki'
                ? 'bg-[#1D8E5A] text-white shadow-lg shadow-emerald-500/30'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Data Muzakki
          </button>
        </div>

        {/* Content Card */}
        <div className="card-islamic">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Cari ${activeTab === 'transaksi' ? 'transaksi' : 'muzakki'}...`}
                className="input-islamic pl-12"
              />
            </div>
            <div className="flex gap-2">
              <button className="btn-outline !py-2.5 text-sm">
                <Filter size={16} />
                Filter
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm hover:bg-gray-50 transition-colors">
                <Download size={16} />
                Export
              </button>
              <button className="btn-primary !py-2.5 text-sm">
                <Plus size={16} />
                {activeTab === 'transaksi' ? 'Tambah Zakat' : 'Tambah Muzakki'}
              </button>
            </div>
          </div>

          {/* Table */}
          {activeTab === 'transaksi' ? (
            <div className="overflow-x-auto">
              <table className="table-islamic">
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
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#1D8E5A]/10 flex items-center justify-center">
                            <Wallet size={18} className="text-[#1D8E5A]" />
                          </div>
                          <span className="font-medium text-[#222]">{t.no}</span>
                        </div>
                      </td>
                      <td className="text-gray-500">{t.tanggal}</td>
                      <td className="text-[#222] font-medium">{t.muzakki}</td>
                      <td>
                        <span className={`badge-islamic ${t.jenis.includes('Mal') ? 'badge-green' : 'badge-gold'}`}>
                          {t.jenis}
                        </span>
                      </td>
                      <td className="text-[#222] font-semibold">{formatRupiah(t.jumlah)}</td>
                      <td className="text-gray-500">{t.bayar}</td>
                      <td>
                        <span className="badge-islamic badge-green">
                          <CheckCircle size={12} />
                          Berhasil
                        </span>
                      </td>
                      <td>
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-islamic">
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
                      <td className="font-medium text-[#222]">{m.id}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#1D8E5A]/10 flex items-center justify-center text-[#1D8E5A] font-semibold">
                            {m.nama.charAt(0)}
                          </div>
                          <span className="font-medium text-[#222]">{m.nama}</span>
                        </div>
                      </td>
                      <td className="text-gray-500">{m.telp}</td>
                      <td className="text-gray-500">{m.alamat}</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Eye size={16} className="text-gray-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Edit size={16} className="text-gray-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              Menampilkan 1-5 dari {activeTab === 'transaksi' ? '5' : '5'} data
            </p>
            <div className="flex gap-1">
              <button className="w-10 h-10 rounded-lg bg-[#1D8E5A] text-white font-medium text-sm">1</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-islamic mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; 2026 SIMMASAMAL - Masjid Khairul Amal. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-white/40 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
