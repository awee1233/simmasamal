import { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Heart, 
  Users, 
  TrendingUp, 
  Settings, 
  BookOpen,
  Clock,
  Package,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,

  Search,

} from 'lucide-react';

interface SidebarProProps {
  activeMenu?: string;
  onMenuClick?: (menu: string) => void;
}

export default function SidebarPro({ activeMenu = 'dashboard', onMenuClick }: SidebarProProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'zakat', label: 'Zakat', icon: Wallet, badge: '5' },
    { id: 'infaq', label: 'Infaq & Donatur', icon: Heart, badge: '4' },
    { id: 'mustahik', label: 'Mustahik', icon: Users, badge: null },
    { id: 'penyaluran', label: 'Penyaluran', icon: TrendingUp, badge: '1' },
    { id: 'qurban', label: 'Qurban', icon: Calendar, badge: null },
    { id: 'sholat', label: 'Jadwal Sholat', icon: Clock, badge: null },
    { id: 'kajian', label: 'Kajian', icon: BookOpen, badge: '3' },
    { id: 'inventory', label: 'Inventaris', icon: Package, badge: null },
    { id: 'laporan', label: 'Laporan', icon: TrendingUp, badge: null },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings, badge: null },
  ];

  return (
    <div className={`sidebar-modern flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'w-[80px]' : 'w-[280px]'}`}>
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center shadow-lg shadow-[#00d4aa]/20">
            <Moon size={20} className="text-[#0a0a0a]" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-white font-bold text-[15px] tracking-tight">SIMMASAMAL</h1>
              <p className="text-[#555] text-[11px] mt-0.5">Masjid Khairul Amal</p>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
            <input
              type="text"
              placeholder="Cari menu..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#888] placeholder:text-[#333] focus:outline-none focus:border-[#00d4aa]/30 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-[#444] text-[10px] font-semibold uppercase tracking-widest px-4 py-2">Menu Utama</p>
        )}
        
        {menuItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onMenuClick?.(item.id)}
              className={`sidebar-item w-full ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-[10px] font-medium text-[#666]">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}

        {!collapsed && (
          <div className="divider my-3" />
        )}
        {!collapsed && (
          <p className="text-[#444] text-[10px] font-semibold uppercase tracking-widest px-4 py-2">Lainnya</p>
        )}

        {menuItems.slice(6).map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onMenuClick?.(item.id)}
              className={`sidebar-item w-full ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-[10px] font-medium text-[#666]">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/[0.06] space-y-2">
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-item w-full"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-sm">Kecilkan Sidebar</span>}
        </button>

        {/* User Info */}
        <div className={`flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff4757] to-[#ff6b81] flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Administrator</p>
                <p className="text-[#555] text-xs truncate">admin@simmasamal.com</p>
              </div>
              <button className="btn-icon w-8 h-8">
                <LogOut size={14} className="text-[#ff4757]" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
