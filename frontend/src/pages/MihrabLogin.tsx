import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Eye, EyeOff, ArrowRight, Lock, Mail, User, MapPin, Phone, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function MihrabLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const demoAccounts = [
    { email: 'admin@simmasamal.com', role: 'Administrator', password: 'password123' },
    { email: 'bendahara@simmasamal.com', role: 'Bendahara DKM', password: 'password123' },
    { email: 'petugas@simmasamal.com', role: 'Petugas Qurban', password: 'password123' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Login gagal. Periksa email dan password.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/img/bg/log-reg.jpg" 
            alt="Masjid" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#042023]/95 via-[#042023]/70 to-[#042023]/50" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end p-16 w-full">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1D8E5A] to-[#166B44] flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-8">
            <Moon size={40} className="text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            SIMMASAMAL
          </h1>
          <p className="text-white/80 text-xl mb-8">
            Sistem Manajemen Masjid Khairul Amal
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-white/70">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <span>Jl. Khairul Amal No. 10, Jakarta</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Phone size={18} />
              </div>
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Clock size={18} />
              </div>
              <span>Buka Setiap Hari: 04:00 - 21:00</span>
            </div>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <p className="text-white/90 text-sm italic">
              "Sesungguhnya orang-orang yang bersedekah baik laki-laki maupun perempuan dan meminjamkan kepada Allah pinjaman yang baik, niscaya akan dilipatgandakan (pahala) bagi mereka."
            </p>
            <p className="text-white/60 text-xs mt-3">— QS. Al-Hadid: 18</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1D8E5A] to-[#166B44] flex items-center justify-center shadow-lg">
              <Moon size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#042023]">SIMMASAMAL</h1>
              <p className="text-gray-500 text-sm">Masjid Khairul Amal</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#042023] mb-2">
              Assalamu'alaikum
            </h2>
            <p className="text-gray-500">
              Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-islamic pl-12"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-islamic pl-12 pr-12"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1D8E5A] focus:ring-[#1D8E5A]" />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
              <a href="#" className="text-sm text-[#1D8E5A] hover:underline font-medium">
                Lupa password?
              </a>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full !py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  Masuk
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 p-5 bg-[#F4F6F9] rounded-xl">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Akun Demo
            </p>
            <div className="space-y-2">
              {demoAccounts.map((account, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1D8E5A]/10 flex items-center justify-center group-hover:bg-[#1D8E5A] transition-colors">
                      <User size={18} className="text-[#1D8E5A] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{account.email}</p>
                      <p className="text-xs text-gray-500">{account.role}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-[#1D8E5A] transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-8">
            &copy; 2026 SIMMASAMAL - Masjid Khairul Amal
          </p>
        </div>
      </div>
    </div>
  );
}
