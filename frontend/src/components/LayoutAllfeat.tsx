import { ReactNode } from 'react';
import SidebarAllfeat from './SidebarAllfeat';
import { Bell, Search, User } from 'lucide-react';

interface LayoutAllfeatProps {
  children: ReactNode;
  activeMenu?: string;
  onMenuClick?: (menu: string) => void;
}

export default function LayoutAllfeat({ children, activeMenu = 'dashboard', onMenuClick }: LayoutAllfeatProps) {
  return (
    <div className="flex min-h-screen bg-canvas-dark">
      {/* Sidebar */}
      <SidebarAllfeat activeMenu={activeMenu} onMenuClick={onMenuClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-canvas-dark/80 backdrop-blur-xl border-b border-blueprint-gray">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ghost-gray" />
              <input
                type="text"
                placeholder="Cari menu, transaksi, atau data..."
                className="input-dark w-full pl-10 pr-4 py-2"
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-blueprint-gray transition-colors">
                <Bell size={20} className="text-slate-text" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-impact-red" />
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-blueprint-gray" />

              {/* User Menu */}
              <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-blueprint-gray transition-colors">
                <div className="w-8 h-8 rounded-full bg-impact-red/20 flex items-center justify-center">
                  <User size={16} className="text-impact-red" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-whisper-white text-sm font-medium">Administrator</p>
                  <p className="text-ghost-gray text-xs">admin@simmasamal.com</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
