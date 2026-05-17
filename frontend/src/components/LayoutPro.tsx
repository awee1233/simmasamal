import { ReactNode } from 'react';
import SidebarPro from './SidebarPro';
import { Bell, Search, User, ChevronDown, Settings, LogOut, Moon } from 'lucide-react';

import { useState } from 'react';

interface LayoutProProps {
  children: ReactNode;
  activeMenu?: string;
  onMenuClick?: (menu: string) => void;
}

export default function LayoutPro({ children, activeMenu = 'dashboard', onMenuClick }: LayoutProProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Sidebar */}
      <SidebarPro activeMenu={activeMenu} onMenuClick={onMenuClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-6 lg:px-8 py-4">
            {/* Left - Breadcrumb */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center lg:hidden">
                <Moon size={14} className="text-[#00d4aa]" />
              </div>
              <div className="hidden sm:block">
                <p className="text-[#444] text-xs">Masjid Khairul Amal</p>
                <p className="text-white text-sm font-medium capitalize">{activeMenu}</p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  type="text"
                  placeholder="Cari..."
                  className="w-64 bg-white/[0.04] border border-white/[0.06] rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-[#00d4aa]/30 transition-colors"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333] text-[10px] bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06]">⌘K</kbd>
              </div>

              {/* Notifications */}
              <button className="btn-icon relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff4757] shadow-[0_0_6px_#ff4757]" />
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-white/[0.06]" />

              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff4757] to-[#ff6b81] flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-white text-sm font-medium">Administrator</p>
                    <p className="text-[#555] text-xs">admin@simmasamal.com</p>
                  </div>
                  <ChevronDown size={14} className="text-[#555] hidden sm:block" />
                </button>

                {/* Dropdown */}
                {showUserMenu && (
                  <div className="dropdown-modern absolute right-0 top-full mt-2 w-56">
                    <div className="p-3 border-b border-white/[0.06]">
                      <p className="text-white text-sm font-medium">Administrator</p>
                      <p className="text-[#555] text-xs mt-0.5">admin@simmasamal.com</p>
                    </div>
                    <div className="p-1.5">
                      <button className="dropdown-item w-full">
                        <User size={16} />
                        <span>Profil Saya</span>
                      </button>
                      <button className="dropdown-item w-full">
                        <Settings size={16} />
                        <span>Pengaturan</span>
                      </button>
                      <div className="divider my-1" />
                      <button className="dropdown-item w-full text-[#ff4757]">
                        <LogOut size={16} />
                        <span>Keluar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Overlay for closing dropdown */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}
