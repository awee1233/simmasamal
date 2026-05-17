import { 
  TrendingUp, 
  Users, 
  Heart, 
  Wallet, 
  Calendar,
  Clock,
  BookOpen,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

export default function DashboardAllfeat() {
  return (
    <div className="min-h-screen bg-canvas-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-text text-sm tracking-wider uppercase">Dashboard</p>
            <h1 className="text-whisper-white text-4xl font-semibold tracking-tight mt-1">
              SIMMASAMAL
            </h1>
            <p className="text-ghost-gray text-base mt-2">Masjid Khairul Amal — Sistem Manajemen</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="badge">1447 H</div>
            <button className="btn-primary flex items-center gap-2">
              <Wallet size={16} />
              <span>Ambil Zakat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Total Zakat</p>
              <p className="stat-value">Rp 16.3M</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight size={14} className="text-cyber-teal" />
                <span className="text-cyber-teal text-xs">+12% dari bulan lalu</span>
              </div>
            </div>
            <div className="stat-icon">
              <Wallet size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Total Infaq</p>
              <p className="stat-value">Rp 14.5M</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight size={14} className="text-cyber-teal" />
                <span className="text-cyber-teal text-xs">+8% dari bulan lalu</span>
              </div>
            </div>
            <div className="stat-icon">
              <Heart size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Muzakki</p>
              <p className="stat-value">5</p>
              <p className="text-ghost-gray text-xs mt-2">Aktif bulan ini</p>
            </div>
            <div className="stat-icon">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Mustahik</p>
              <p className="stat-value">5</p>
              <p className="text-ghost-gray text-xs mt-2">Terdaftar</p>
            </div>
            <div className="stat-icon" style={{ background: 'rgba(255, 74, 95, 0.1)' }}>
              <TrendingUp size={24} className="text-impact-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Transactions */}
        <div className="lg:col-span-2">
          <div className="card-inset">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-whisper-white text-lg font-medium">Transaksi Terakhir</h2>
              <button className="text-cyber-teal text-sm flex items-center gap-1 hover:underline">
                Lihat Semua <ChevronRight size={14} />
              </button>
            </div>

            <table className="table-dark">
              <thead>
                <tr>
                  <th>No. Transaksi</th>
                  <th>Tanggal</th>
                  <th>Jenis</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-whisper-white font-medium">ZKT-2026-0005</td>
                  <td className="text-slate-text">01 Mei 2026</td>
                  <td><span className="badge">Zakat Fitrah</span></td>
                  <td className="text-whisper-white">Rp 200.000</td>
                  <td><span className="badge-success">Berhasil</span></td>
                </tr>
                <tr>
                  <td className="text-whisper-white font-medium">INF-2026-00004</td>
                  <td className="text-slate-text">05 Apr 2026</td>
                  <td><span className="badge">Infaq Sosial</span></td>
                  <td className="text-whisper-white">Rp 1.500.000</td>
                  <td><span className="badge-success">Berhasil</span></td>
                </tr>
                <tr>
                  <td className="text-whisper-white font-medium">ZKT-2026-0004</td>
                  <td className="text-slate-text">10 Apr 2026</td>
                  <td><span className="badge">Zakat Mal</span></td>
                  <td className="text-whisper-white">Rp 7.500.000</td>
                  <td><span className="badge-success">Berhasil</span></td>
                </tr>
                <tr>
                  <td className="text-whisper-white font-medium">ZKT-2026-0003</td>
                  <td className="text-slate-text">01 Apr 2026</td>
                  <td><span className="badge">Zakat Mal</span></td>
                  <td className="text-whisper-white">Rp 3.500.000</td>
                  <td><span className="badge-success">Berhasil</span></td>
                </tr>
                <tr>
                  <td className="text-whisper-white font-medium">INF-2026-00002</td>
                  <td className="text-slate-text">17 Mar 2026</td>
                  <td><span className="badge">Infaq Pembangunan</span></td>
                  <td className="text-whisper-white">Rp 10.000.000</td>
                  <td><span className="badge-success">Berhasil</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Penyaluran Section */}
          <div className="card-inset mt-6">
            <h2 className="text-whisper-white text-lg font-medium mb-4">Penyaluran Zakat</h2>
            <div className="space-y-3">
              {[
                { name: 'Ahmad Fadillah', asnaf: 'Fakir', amount: 'Rp 2.000.000', status: 'diterima' },
                { name: 'Maria Ulfah', asnaf: 'Miskin', amount: 'Rp 2.000.000', status: 'diterima' },
                { name: 'Dedi Kurniawan', asnaf: 'Amil', amount: 'Rp 1.500.000', status: 'diterima' },
                { name: 'Rina Wati', asnaf: 'Muallaf', amount: 'Rp 1.500.000', status: 'diterima' },
                { name: 'H. Soleh', asnaf: 'Gharimin', amount: 'Rp 1.500.000', status: 'pending' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-blueprint-gray/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyber-teal/10 flex items-center justify-center text-cyber-teal font-medium">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-whisper-white text-sm font-medium">{item.name}</p>
                      <p className="text-ghost-gray text-xs">{item.asnaf}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-whisper-white text-sm">{item.amount}</p>
                    <span className={item.status === 'diterima' ? 'badge-success' : 'badge-danger'}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Jadwal Sholat */}
          <div className="card-inset">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-cyber-teal" />
              <h2 className="text-whisper-white text-lg font-medium">Jadwal Sholat</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Subuh', time: '04:30', iqomah: '04:45', active: false },
                { name: 'Dzuhur', time: '11:45', iqomah: '12:00', active: true },
                { name: 'Ashar', time: '15:00', iqomah: '15:15', active: false },
                { name: 'Maghrib', time: '17:45', iqomah: '17:55', active: false },
                { name: 'Isya', time: '19:00', iqomah: '19:15', active: false },
              ].map((sholat, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    sholat.active ? 'bg-cyber-teal/10 border border-cyber-teal/20' : 'hover:bg-blueprint-gray/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${sholat.active ? 'bg-cyber-teal animate-pulse-teal' : 'bg-blueprint-gray'}`} />
                    <span className={`text-sm font-medium ${sholat.active ? 'text-cyber-teal' : 'text-whisper-white'}`}>
                      {sholat.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${sholat.active ? 'text-cyber-teal' : 'text-whisper-white'}`}>{sholat.time}</p>
                    <p className="text-ghost-gray text-xs">Iqomah {sholat.iqomah}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kajian Terdekat */}
          <div className="card-inset">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} className="text-impact-red" />
              <h2 className="text-whisper-white text-lg font-medium">Kajian Terdekat</h2>
            </div>
            <div className="space-y-4">
              {[
                { 
                  title: 'Fiqih Qurban', 
                  ustad: 'Ustadz Khalid Basalamah', 
                  date: '10 Mei 2026',
                  gradient: 'from-cyber-teal/20 to-transparent'
                },
                { 
                  title: 'Keutamaan Sedekah', 
                  ustad: 'Ustadz Adi Hidayat', 
                  date: '15 Mar 2026',
                  gradient: 'from-impact-red/20 to-transparent'
                },
              ].map((kajian, i) => (
                <div key={i} className={`p-4 rounded-xl bg-gradient-to-r ${kajian.gradient} border border-blueprint-gray/50`}>
                  <h3 className="text-whisper-white text-base font-medium">{kajian.title}</h3>
                  <p className="text-slate-text text-sm mt-1">{kajian.ustad}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Calendar size={14} className="text-ghost-gray" />
                    <span className="text-ghost-gray text-xs">{kajian.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-inset">
            <h2 className="text-whisper-white text-lg font-medium mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-primary text-sm py-3 flex items-center justify-center gap-2">
                <Wallet size={16} />
                <span>Zakat</span>
              </button>
              <button className="btn-accent text-sm py-3 flex items-center justify-center gap-2">
                <Heart size={16} />
                <span>Infaq</span>
              </button>
              <button className="bg-blueprint-gray text-whisper-white rounded-full py-3 text-sm flex items-center justify-center gap-2 hover:bg-shadow-tint transition-colors">
                <Users size={16} />
                <span>Muzakki</span>
              </button>
              <button className="bg-blueprint-gray text-whisper-white rounded-full py-3 text-sm flex items-center justify-center gap-2 hover:bg-shadow-tint transition-colors">
                <TrendingUp size={16} />
                <span>Laporan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
