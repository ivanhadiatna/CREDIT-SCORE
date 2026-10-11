import React from 'react';
import { LogOut, User as UserIcon, Shield, Menu } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onToggleSidebar }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
              CS
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-wide text-white uppercase">
                CREDIT SCORING
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
                C5.0 Engine
              </span>
            </div>
          </div>
        </div>

        {/* Right: User details & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <UserIcon className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium text-slate-200">{user.username}</span>
            <span className="text-slate-500">&bull;</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 capitalize">
              <Shield className="w-3 h-3 text-sky-400" />
              {user.role}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
            title="Keluar dari sistem"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
