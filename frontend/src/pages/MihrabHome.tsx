import { useState, useEffect } from 'react';
import { 
  Heart, Wallet, Users, BookOpen, Clock, Calendar,
  ChevronRight, ArrowRight, Phone, Mail, MapPin, Star,
  LogIn, Building2,
  Facebook, Twitter, Instagram, Youtube, Menu, X,
} from 'lucide-react';

export default function MihrabHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sholatSchedule = [
    { name: 'Subuh', time: '04:30', iqomah: '04:45' },
    { name: 'Dzuhur', time: '11:45', iqomah: '12:00' },
    { name: 'Ashar', time: '15:00', iqomah: '15:15' },
    { name: 'Maghrib', time: '17:45', iqomah: '17:55' },
    { name: 'Isya', time: '19:00', iqomah: '19:15' },
  ];

  const stats = [
    { icon: Wallet, value: 'Rp 16.3M', label: 'Zakat Terkumpul', color: '#1D8E5A' },
    { icon: Heart, value: 'Rp 14.5M', label: 'Infaq Terkumpul', color: '#F5C50B' },
    { icon: Users, value: '5', label: 'Muzakki Aktif', color: '#4A3AFF' },
    { icon: Building2, value: '5', label: 'Mustahik', color: '#FF3636' },
  ];

  const services = [
    { icon: Wallet, title: 'Zakat', desc: 'Salurkan zakat Anda dengan mudah dan amanah', link: '/zakat', image: '/assets/img/services/praying.svg' },
    { icon: Heart, title: 'Infaq', desc: 'Berikan infaq untuk kemakmuran masjid', link: '/infaq', image: '/assets/img/services/quran.svg' },
    { icon: Calendar, title: 'Qurban', desc: 'Daftarkan qurban Anda untuk Hari Raya', link: '/qurban', image: '/assets/img/services/islamic.svg' },
    { icon: BookOpen, title: 'Kajian', desc: 'Ikuti kajian rutin bersama ustadz kami', link: '/kajian', image: '/assets/img/services/book.svg' },
  ];

  const kajianList = [
    {
      title: 'Fiqih Qurban',
      ustad: 'Ustadz Khalid Basalamah',
      date: '10 Mei 2026',
      image: '/assets/img/slider/slide1.jpg',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Keutamaan Sedekah',
      ustad: 'Ustadz Adi Hidayat',
      date: '15 Mar 2026',
      image: '/assets/img/slider/slide2.jpg',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Fiqih Puasa Ramadhan',
      ustad: 'Ustadz Abdul Somad',
      date: '01 Mar 2026',
      image: '/assets/img/bg/prayer_bg.jpg',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  const inventaris = [
    { name: 'Sajadah', total: 50, baik: 45, rusak: 5, icon: '🕌' },
    { name: 'Al-Quran', total: 30, baik: 28, rusak: 2, icon: '📖' },
    { name: 'Karpet', total: 20, baik: 18, rusak: 2, icon: '🟫' },
    { name: 'Kipas Angin', total: 10, baik: 8, rusak: 2, icon: '🌀' },
    { name: 'Speaker', total: 4, baik: 4, rusak: 0, icon: '🔊' },
  ];

  return (
    <div className="min-h-screen">
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
            <span className="flex items-center gap-2">
              <Phone size={14} />
              +62 812-3456-7890
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
      <nav className={`navbar-islamic sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <img src="/assets/img/logo.svg" alt="SIMMASAMAL" className="h-10" />
              <div>
                <h1 className="text-xl font-bold text-[#042023] leading-tight">SIMMASAMAL</h1>
                <p className="text-xs text-gray-500">Masjid Khairul Amal</p>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2">
              {[
                { label: 'Beranda', href: '/', active: true },
                { label: 'Zakat', href: '/zakat' },
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

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <a href="/login" className="hidden sm:flex btn-outline !py-2.5 !px-5 text-sm">
                <LogIn size={16} />
                Masuk
              </a>
              <a href="/zakat" className="btn-primary !py-2.5 !px-5 text-sm">
                <Wallet size={16} />
                Bayar Zakat
              </a>
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="p-4 space-y-1">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Zakat', href: '/zakat' },
                { label: 'Infaq', href: '/infaq' },
                { label: 'Qurban', href: '/qurban' },
                { label: 'Kajian', href: '/kajian' },
                { label: 'Jadwal Sholat', href: '/sholat' },
                { label: 'Kontak', href: '/kontak' },
                { label: 'Masuk', href: '/login' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="block py-3 px-4 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-islamic relative min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/assets/img/bg/banner.jpg" 
            alt="Masjid" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#042023]/95 via-[#042023]/80 to-[#042023]/60" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <img src="/assets/img/icons/bismillah.svg" alt="" className="w-full h-full object-contain" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
                <Star size={14} className="text-[#F5C50B]" />
                <span>Masjid Khairul Amal</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Salurkan Zakat & Infaq Anda dengan{' '}
                <span className="text-[#F5C50B]">Amanah</span>
              </h1>
              
              <p className="text-white/70 text-lg mb-8 max-w-lg">
                Bersama membangun umat melalui pengelolaan zakat, infaq, dan qurban yang transparan dan profesional.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="/zakat" className="btn-secondary !py-4 !px-8 text-base">
                  <Wallet size={20} />
                  Bayar Zakat Sekarang
                </a>
                <a href="/about" className="btn-white !py-4 !px-8 text-base">
                  Pelajari Lebih Lanjut
                  <ArrowRight size={18} />
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
                {[
                  { value: '5', label: 'Muzakki' },
                  { value: '5', label: 'Mustahik' },
                  { value: 'Rp 16M', label: 'Zakat' },
                  { value: 'Rp 14M', label: 'Infaq' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prayer Times Card */}
            <div className="animate-fade-up hidden lg:block" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#F5C50B] flex items-center justify-center">
                    <Clock size={24} className="text-[#042023]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Jadwal Sholat Hari Ini</h3>
                    <p className="text-white/60 text-sm">Selasa, 12 Mei 2026</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {sholatSchedule.map((sholat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#1D8E5A]" />
                        <span className="text-white font-medium">{sholat.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-white/60 text-xs">Adzan</p>
                          <p className="text-white font-semibold">{sholat.time}</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-right">
                          <p className="text-white/60 text-xs">Iqomah</p>
                          <p className="text-[#F5C50B] font-semibold">{sholat.iqomah}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="/sholat" className="flex items-center justify-center gap-2 mt-6 text-[#F5C50B] hover:text-white transition-colors">
                  <span>Lihat Jadwal Lengkap</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <img src="/assets/img/slider/btm_shape.svg" alt="" className="w-full" />
        </div>
      </section>

      {/* Bismillah */}
      <div className="py-8 text-center">
        <img src="/assets/img/icons/bismillah.svg" alt="Bismillah" className="h-16 mx-auto opacity-80" />
      </div>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-heading">
            <span className="subtitle">Layanan Kami</span>
            <h2>Layanan Masjid Khairul Amal</h2>
            <p>Kami menyediakan berbagai layanan untuk memudahkan ibadah dan kegiatan keagamaan Anda</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              return (
                <a key={i} href={service.link} className="card-islamic group text-center">
                  <div className="w-24 h-24 mx-auto mb-6">
                    <img src={service.image} alt={service.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#222] mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{service.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#1D8E5A] font-medium text-sm">
                    Selengkapnya <ArrowRight size={14} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/img/bg/counter.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#042023]/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="counter-box text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="counter-number text-white">{stat.value}</div>
                  <div className="counter-label text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kajian Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-heading">
            <span className="subtitle">Kajian & Ilmu</span>
            <h2>Jadwal Kajian Terdekat</h2>
            <p>Ikuti kajian rutin bersama ustadz-ustadz kami untuk menambah ilmu keagamaan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {kajianList.map((kajian, i) => (
              <div key={i} className="card-islamic group overflow-hidden">
                <div className="h-56 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <img 
                    src={kajian.image} 
                    alt={kajian.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-[#1D8E5A]" />
                  <span className="text-sm text-gray-500">{kajian.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#222] mb-2 group-hover:text-[#1D8E5A] transition-colors">
                  {kajian.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  <Users size={14} className="inline mr-1" />
                  {kajian.ustad}
                </p>
                <a href="/kajian" className="inline-flex items-center gap-1 text-[#1D8E5A] font-medium text-sm">
                  Detail Kajian <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/kajian" className="btn-outline">
              Lihat Semua Kajian
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Prayer Time Section */}
      <section className="section-padding bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="subtitle">Jadwal Sholat</span>
              <h2 className="text-3xl font-bold text-[#222] mb-6">Jadwal Sholat Hari Ini</h2>
              <p className="text-gray-500 mb-8">
                Berikut adalah jadwal sholat untuk hari ini di Masjid Khairul Amal. Mari kita jaga sholat tepat waktu.
              </p>
              
              <div className="space-y-4">
                {sholatSchedule.map((sholat, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1D8E5A]/10 flex items-center justify-center">
                        <Clock size={20} className="text-[#1D8E5A]" />
                      </div>
                      <span className="font-semibold text-[#222] text-lg">{sholat.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Adzan</p>
                        <p className="font-bold text-[#222]">{sholat.time}</p>
                      </div>
                      <div className="w-px h-10 bg-gray-200" />
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Iqomah</p>
                        <p className="font-bold text-[#1D8E5A]">{sholat.iqomah}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img src="/assets/img/bg/prayer_time.jpg" alt="Prayer Time" className="rounded-2xl shadow-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-[#F5C50B] flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#042023]">5</p>
                  <p className="text-sm text-[#042023]/80">Waktu Sholat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D8E5A] to-[#166B44]" />
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <img src="/assets/img/icons/title-white.svg" alt="" className="w-full h-full object-contain" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Salurkan Zakat Anda Sekarang
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Zakat yang Anda salurkan akan dikelola dengan amanah dan disalurkan kepada yang berhak menerimanya
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/zakat" className="btn-secondary !py-4 !px-8 text-base">
              <Wallet size={20} />
              Bayar Zakat
            </a>
            <a href="/contact" className="btn-white !py-4 !px-8 text-base">
              <Phone size={18} />
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* Inventaris Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-heading">
            <span className="subtitle">Inventaris Masjid</span>
            <h2>Kondisi Inventaris</h2>
            <p>Data inventaris dan kondisi perlengkapan masjid</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {inventaris.map((item, i) => (
              <div key={i} className="card-islamic text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="font-semibold text-[#222] mb-2">{item.name}</h4>
                <p className="text-4xl font-bold text-[#1D8E5A] mb-1">{item.total}</p>
                <p className="text-sm text-gray-500 mb-3">Total Unit</p>
                <div className="flex justify-center gap-2">
                  <span className="badge-green">{item.baik} Baik</span>
                  {item.rusak > 0 && <span className="badge-red">{item.rusak} Rusak</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section-padding bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-heading">
            <span className="subtitle">Rukun Islam</span>
            <h2>Lima Rukun Islam</h2>
            <p>Sebagai panduan umat Muslim dalam menjalankan ibadah</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { name: 'Syahadat', image: '/assets/img/pillars/1.png' },
              { name: 'Sholat', image: '/assets/img/pillars/2.png' },
              { name: 'Zakat', image: '/assets/img/pillars/3.png' },
              { name: 'Puasa', image: '/assets/img/pillars/4.png' },
              { name: 'Haji', image: '/assets/img/pillars/5.png' },
            ].map((pillar, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all">
                  <img src={pillar.image} alt={pillar.name} className="w-16 h-16 object-contain" />
                </div>
                <h4 className="font-semibold text-[#222]">{pillar.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-islamic">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
            {/* About */}
            <div>
              <a href="/" className="flex items-center gap-3 mb-6">
                <img src="/assets/img/logo-white.svg" alt="SIMMASAMAL" className="h-10" />
              </a>
              <p className="text-white/60 text-sm mb-6">
                Sistem Manajemen Masjid Khairul Amal. Mengelola zakat, infaq, dan qurban dengan amanah dan transparan.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1D8E5A] transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1D8E5A] transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1D8E5A] transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1D8E5A] transition-colors">
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h5 className="text-white font-semibold mb-6">Link Cepat</h5>
              <ul className="space-y-3">
                {['Beranda', 'Zakat', 'Infaq', 'Qurban', 'Kajian', 'Kontak'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-white/60 hover:text-[#F5C50B] transition-colors flex items-center gap-2">
                      <ChevronRight size={14} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-white font-semibold mb-6">Kontak</h5>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#1D8E5A] mt-1 flex-shrink-0" />
                  <span className="text-white/60 text-sm">Jl. Khairul Amal No. 10, RT 01/RW 02, Jakarta Selatan</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#1D8E5A] flex-shrink-0" />
                  <span className="text-white/60 text-sm">+62 812-3456-7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#1D8E5A] flex-shrink-0" />
                  <span className="text-white/60 text-sm">info@masjidkhairulamal.id</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={18} className="text-[#1D8E5A] flex-shrink-0" />
                  <span className="text-white/60 text-sm">Buka Setiap Hari: 04:00 - 21:00</span>
                </li>
              </ul>
            </div>

            {/* Jadwal Sholat */}
            <div>
              <h5 className="text-white font-semibold mb-6">Jadwal Sholat</h5>
              <div className="space-y-3">
                {sholatSchedule.map((sholat, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-white/80 text-sm">{sholat.name}</span>
                    <span className="text-[#F5C50B] font-medium text-sm">{sholat.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
