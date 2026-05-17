import { useState } from 'react';
import { Eye, EyeOff, Moon, ArrowRight } from 'lucide-react';

export default function LoginAllfeat() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-canvas-dark flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-teal/20 via-transparent to-impact-red/20" />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(circle at 30% 50%, rgba(0, 177, 140, 0.15) 0%, transparent 50%)' 
        }} />
        
        {/* Decorative Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-blueprint-gray/30" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-blueprint-gray/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-cyber-teal/5" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-16 h-16 rounded-2xl bg-cyber-teal flex items-center justify-center mb-8">
            <Moon size={32} className="text-canvas-dark" />
          </div>
          <h1 className="text-whisper-white text-5xl font-semibold tracking-tight leading-none">
            SIMMASAMAL
          </h1>
          <p className="text-slate-text text-xl mt-4 max-w-md">
            Sistem Manajemen Masjid Khairul Amal
          </p>
          <div className="mt-8 flex gap-4">
            <div className="badge-highlight">Zakat</div>
            <div className="badge">Infaq</div>
            <div className="badge">Qurban</div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-cyber-teal flex items-center justify-center">
              <Moon size={24} className="text-canvas-dark" />
            </div>
            <div>
              <h1 className="text-whisper-white font-semibold text-xl">SIMMASAMAL</h1>
              <p className="text-ghost-gray text-sm">Masjid Khairul Amal</p>
            </div>
          </div>

          <div>
            <h2 className="text-whisper-white text-3xl font-semibold tracking-tight">
              Selamat Datang
            </h2>
            <p className="text-slate-text text-base mt-2">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div>
              <label className="text-slate-text text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark w-full"
                placeholder="nama@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-text text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-dark w-full pr-12"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ghost-gray hover:text-whisper-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-blueprint-gray bg-canvas-dark text-cyber-teal focus:ring-cyber-teal" />
                <span className="text-slate-text text-sm">Ingat saya</span>
              </label>
              <button type="button" className="text-cyber-teal text-sm hover:underline">
                Lupa password?
              </button>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base">
              <span>Masuk</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 rounded-xl border border-blueprint-gray">
            <p className="text-ghost-gray text-xs uppercase tracking-wider mb-3">Akun Demo</p>
            <div className="space-y-2">
              {[
                { email: 'admin@simmasamal.com', role: 'Administrator' },
                { email: 'bendahara@simmasamal.com', role: 'Bendahara DKM' },
                { email: 'petugas@simmasamal.com', role: 'Petugas Qurban' },
              ].map((account, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('password123');
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blueprint-gray/30 transition-colors"
                >
                  <div className="text-left">
                    <p className="text-whisper-white text-sm">{account.email}</p>
                    <p className="text-ghost-gray text-xs">{account.role}</p>
                  </div>
                  <ArrowRight size={14} className="text-ghost-gray" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-ghost-gray text-xs text-center mt-8">
            &copy; 2026 SIMMASAMAL — Masjid Khairul Amal
          </p>
        </div>
      </div>
    </div>
  );
}
