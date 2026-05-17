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
  Moon
} from 'lucide-react';

interface SidebarProps {
  activeMenu?: string;
  onMenuClick?: (menu: string) => void;
}

export default function SidebarAllfeat({ activeMenu = 'dashboard', onMenuClick }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'zakat', label: 'Zakat', icon: Wallet },
    { id: 'infaq', label: 'Infaq & Donatur', icon: Heart },
    { id: 'mustahik', label: 'Mustahik', icon: Users },
    { id: 'penyaluran', label: 'Penyaluran', icon: TrendingUp },
    { id: 'qurban', label: 'Qurban', icon: Calendar },
    { id: 'sholat', label: 'Jadwal Sholat', icon: Clock },
    { id: 'kajian', label: 'Kajian', icon: BookOpen },
    { id: 'inventory', label: 'Inventaris', icon: Package },
    { id: 'laporan', label: 'Laporan', icon: TrendingUp },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className={`sidebar flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
      {/* Logo */}
      <div className="p-6 border-b border-blueprint-gray">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyber-teal flex items-center justify-center">
            <Moon size={20} className="text-canvas-dark" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-whisper-white font-semibold text-lg tracking-tight">SIMMASAMAL</h1>
              <p className="text-ghost-gray text-xs">Masjid Khairul Amal</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onMenuClick?.(item.id)}
              className={`sidebar-item w-full ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-blueprint-gray space-y-2">
        {/* User Info */}
        <div className={`flex items-center gap-3 p-3 rounded-xl bg-blueprint-gray/30 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-impact-red/20 flex items-center justify-center text-impact-red text-sm font-medium">
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-whisper-white text-sm font-medium truncate">Administrator</p>
              <p className="text-ghost-gray text-xs truncate">admin@simmasamal.com</p>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-item w-full"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>

        {/* Logout */}
        <button className="sidebar-item w-full text-impact-red hover:text-impact-red">
          <LogOut size={20} />
          {!collapsed && <span className="text-sm">Keluar</span>}
        </button>
      </div>
    </div>
  );
}
