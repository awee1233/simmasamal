import { 
  TrendingUp, 

  Users, 
  Heart, 
  Wallet, 
  Calendar,
  Clock,
  BookOpen,

  ArrowRight,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Zap,
  Activity,
  PieChart,
  BarChart3,
  Sparkles
} from 'lucide-react';

export default function DashboardPro() {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-8">
      {/* Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00d4aa] rounded-full filter blur-[200px] opacity-[0.03]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a855f7] rounded-full filter blur-[200px] opacity-[0.03]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="badge-teal">
                  <Sparkles size={12} />
                  <span>1447 H</span>
                </div>
                <span className="text-[#444] text-sm">•</span>
                <span className="text-[#555] text-sm">Selasa, 12 Mei 2026</span>
              </div>
              <h1 className="text-white text-4xl lg:text-5xl font-bold tracking-tight">
                Assalamu'alaikum
              </h1>
              <p className="text-[#666] text-lg mt-2">
                Dashboard Masjid Khairul Amal
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-ghost flex items-center gap-2">
                <BarChart3 size={16} />
                <span>Laporan</span>
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Wallet size={16} />
                <span>Ambil Zakat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {/* Zakat Card */}
          <div className="stat-card-modern teal group">
            <div className="flex items-start justify-between mb-4">
              <div className="stat-icon-modern teal">
                <Wallet size={24} />
              </div>
              <button className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div>
              <p className="text-[#666] text-sm font-medium mb-1">Total Zakat</p>
              <p className="text-white text-3xl font-bold tracking-tight">Rp 16.3M</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#00d4aa]/10">
                  <TrendingUp size={12} className="text-[#00d4aa]" />
                  <span className="text-[#00d4aa] text-xs font-medium">+12%</span>
                </div>
                <span className="text-[#444] text-xs">vs bulan lalu</span>
              </div>
              <span className="text-[#555] text-xs">5 transaksi</span>
            </div>
          </div>

          {/* Infaq Card */}
          <div className="stat-card-modern purple group">
            <div className="flex items-start justify-between mb-4">
              <div className="stat-icon-modern purple">
                <Heart size={24} />
              </div>
              <button className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div>
              <p className="text-[#666] text-sm font-medium mb-1">Total Infaq</p>
              <p className="text-white text-3xl font-bold tracking-tight">Rp 14.5M</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#a855f7]/10">
                  <TrendingUp size={12} className="text-[#a855f7]" />
                  <span className="text-[#a855f7] text-xs font-medium">+8%</span>
                </div>
                <span className="text-[#444] text-xs">vs bulan lalu</span>
              </div>
              <span className="text-[#555] text-xs">4 transaksi</span>
            </div>
          </div>

          {/* Muzakki Card */}
          <div className="stat-card-modern blue group">
            <div className="flex items-start justify-between mb-4">
              <div className="stat-icon-modern blue">
                <Users size={24} />
              </div>
              <button className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div>
              <p className="text-[#666] text-sm font-medium mb-1">Muzakki</p>
              <p className="text-white text-3xl font-bold tracking-tight">5</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
              <span className="text-[#555] text-xs">Aktif bulan ini</span>
              <div className="flex -space-x-2">
                {['B', 'S', 'A', 'I', 'F'].map((initial, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-[#3b82f6]/20 border-2 border-[#0a0a0a] flex items-center justify-center text-[#3b82f6] text-[10px] font-medium">
                    {initial}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mustahik Card */}
          <div className="stat-card-modern red group">
            <div className="flex items-start justify-between mb-4">
              <div className="stat-icon-modern red">
                <Activity size={24} />
              </div>
              <button className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div>
              <p className="text-[#666] text-sm font-medium mb-1">Mustahik</p>
              <p className="text-white text-3xl font-bold tracking-tight">5</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
              <span className="text-[#555] text-xs">Terdaftar</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="w-3/4 h-full rounded-full bg-[#ff4757]" />
                </div>
                <span className="text-[#555] text-xs">75%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            {/* Transactions */}
            <div className="card-modern">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-lg font-semibold">Transaksi Terakhir</h2>
                  <p className="text-[#555] text-sm mt-1">5 transaksi terbaru</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="tab-modern active">Semua</button>
                  <button className="tab-modern">Zakat</button>
                  <button className="tab-modern">Infaq</button>
                </div>
              </div>

              <table className="table-modern">
                <thead>
                  <tr>
                    <th>No. Transaksi</th>
                    <th>Tanggal</th>
                    <th>Jenis</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { no: 'ZKT-2026-0005', date: '01 Mei 2026', type: 'Zakat Fitrah', amount: 200000, status: 'success' },
                    { no: 'INF-2026-00004', date: '05 Apr 2026', type: 'Infaq Sosial', amount: 1500000, status: 'success' },
                    { no: 'ZKT-2026-0004', date: '10 Apr 2026', type: 'Zakat Mal', amount: 7500000, status: 'success' },
                    { no: 'ZKT-2026-0003', date: '01 Apr 2026', type: 'Zakat Mal', amount: 3500000, status: 'success' },
                    { no: 'INF-2026-00002', date: '17 Mar 2026', type: 'Infaq Pembangunan', amount: 10000000, status: 'success' },
                  ].map((tx, i) => (
                    <tr key={i}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            tx.type.includes('Zakat') ? 'bg-[#00d4aa]/10 text-[#00d4aa]' : 'bg-[#a855f7]/10 text-[#a855f7]'
                          }`}>
                            {tx.type.includes('Zakat') ? <Wallet size={16} /> : <Heart size={16} />}
                          </div>
                          <span className="text-white font-medium text-sm">{tx.no}</span>
                        </div>
                      </td>
                      <td className="text-[#666]">{tx.date}</td>
                      <td>
                        <span className={`badge ${tx.type.includes('Zakat') ? 'badge-teal' : 'badge-purple'}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="text-white font-medium">{formatRupiah(tx.amount)}</td>
                      <td>
                        <span className="badge badge-teal">
                          <Zap size={10} />
                          Berhasil
                        </span>
                      </td>
                      <td>
                        <button className="btn-icon w-8 h-8">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
                <span className="text-[#555] text-sm">Menampilkan 1-5 dari 5</span>
                <button className="text-[#00d4aa] text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Lihat Semua <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Penyaluran */}
            <div className="card-modern">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-lg font-semibold">Penyaluran Zakat</h2>
                  <p className="text-[#555] text-sm mt-1">Total Rp 8.500.000 disalurkan</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="progress-bar w-32">
                    <div className="progress-bar-fill bg-gradient-to-r from-[#00d4aa] to-[#00b894]" style={{ width: '80%' }} />
                  </div>
                  <span className="text-[#00d4aa] text-sm font-medium">80%</span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Ahmad Fadillah', asnaf: 'Fakir', amount: 2000000, status: 'diterima', color: '#00d4aa' },
                  { name: 'Maria Ulfah', asnaf: 'Miskin', amount: 2000000, status: 'diterima', color: '#3b82f6' },
                  { name: 'Dedi Kurniawan', asnaf: 'Amil', amount: 1500000, status: 'diterima', color: '#a855f7' },
                  { name: 'Rina Wati', asnaf: 'Muallaf', amount: 1500000, status: 'diterima', color: '#ff6b35' },
                  { name: 'H. Soleh', asnaf: 'Gharimin', amount: 1500000, status: 'pending', color: '#ff4757' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="avatar" style={{ background: `${item.color}20`, color: item.color }}>
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-[#555] text-xs mt-0.5">{item.asnaf}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white text-sm font-medium">{formatRupiah(item.amount)}</p>
                      </div>
                      <span className={`badge ${item.status === 'diterima' ? 'badge-teal' : 'badge-orange'}`}>
                        {item.status}
                      </span>
                      <button className="btn-icon w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Jadwal Sholat */}
            <div className="card-modern">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center">
                    <Clock size={18} className="text-[#00d4aa]" />
                  </div>
                  <div>
                    <h2 className="text-white text-base font-semibold">Jadwal Sholat</h2>
                    <p className="text-[#555] text-xs">Selasa, 12 Mei 2026</p>
                  </div>
                </div>
                <button className="btn-icon w-8 h-8">
                  <Calendar size={14} />
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Subuh', time: '04:30', iqomah: '04:45', active: false, passed: true },
                  { name: 'Dzuhur', time: '11:45', iqomah: '12:00', active: true, passed: false },
                  { name: 'Ashar', time: '15:00', iqomah: '15:15', active: false, passed: false },
                  { name: 'Maghrib', time: '17:45', iqomah: '17:55', active: false, passed: false },
                  { name: 'Isya', time: '19:00', iqomah: '19:15', active: false, passed: false },
                ].map((sholat, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                      sholat.active 
                        ? 'bg-gradient-to-r from-[#00d4aa]/15 to-transparent border border-[#00d4aa]/20' 
                        : sholat.passed 
                          ? 'opacity-50' 
                          : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-all ${
                        sholat.active ? 'bg-[#00d4aa] shadow-[0_0_10px_#00d4aa]' : sholat.passed ? 'bg-[#333]' : 'bg-[#222]'
                      }`} />
                      <span className={`text-sm font-medium ${sholat.active ? 'text-[#00d4aa]' : 'text-[#888]'}`}>
                        {sholat.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${sholat.active ? 'text-white' : 'text-[#666]'}`}>{sholat.time}</p>
                      </div>
                      <div className="w-px h-6 bg-white/[0.06]" />
                      <div className="text-right">
                        <p className="text-[#444] text-xs">Iqomah</p>
                        <p className={`text-xs font-medium ${sholat.active ? 'text-[#00d4aa]' : 'text-[#555]'}`}>{sholat.iqomah}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kajian */}
            <div className="card-modern">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center">
                    <BookOpen size={18} className="text-[#a855f7]" />
                  </div>
                  <div>
                    <h2 className="text-white text-base font-semibold">Kajian</h2>
                    <p className="text-[#555] text-xs">2 kajian mendatang</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { 
                    title: 'Fiqih Qurban', 
                    ustad: 'Ustadz Khalid Basalamah', 
                    date: '10 Mei 2026',
                    color: '#00d4aa',
                    gradient: 'from-[#00d4aa]/10 to-transparent'
                  },
                  { 
                    title: 'Keutamaan Sedekah', 
                    ustad: 'Ustadz Adi Hidayat', 
                    date: '15 Mar 2026',
                    color: '#a855f7',
                    gradient: 'from-[#a855f7]/10 to-transparent'
                  },
                ].map((kajian, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-gradient-to-r ${kajian.gradient} border border-white/[0.04] hover:border-white/[0.08] transition-colors cursor-pointer group`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white text-sm font-semibold">{kajian.title}</h3>
                        <p className="text-[#666] text-xs mt-1">{kajian.ustad}</p>
                      </div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${kajian.color}20` }}>
                        <ChevronRight size={14} style={{ color: kajian.color }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Calendar size={12} className="text-[#444]" />
                      <span className="text-[#555] text-xs">{kajian.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-modern">
              <h2 className="text-white text-base font-semibold mb-4">Aksi Cepat</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Zakat', icon: Wallet, color: '#00d4aa', gradient: 'card-gradient-teal' },
                  { label: 'Infaq', icon: Heart, color: '#a855f7', gradient: 'card-gradient-purple' },
                  { label: 'Muzakki', icon: Users, color: '#3b82f6', gradient: 'card-gradient-blue' },
                  { label: 'Laporan', icon: PieChart, color: '#ff6b35', gradient: 'card-gradient-red' },
                ].map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <button key={i} className={`${action.gradient} p-4 rounded-xl text-left hover:scale-[1.02] transition-transform`}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${action.color}20` }}>
                        <Icon size={18} style={{ color: action.color }} />
                      </div>
                      <p className="text-white text-sm font-medium">{action.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
