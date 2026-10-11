import React from 'react';
import { GitFork, BookOpen, Info, ShieldAlert, ChevronRight, X } from 'lucide-react';

export type TabType = 'prediksi' | 'help' | 'about';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
}) => {
  const menuItems: { id: TabType; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'prediksi',
      label: 'Klasifikasi',
      icon: <GitFork className="w-5 h-5" />,
      desc: 'Input Data & Upload Excel'
    },
    {
      id: 'help',
      label: 'Bantuan',
      icon: <BookOpen className="w-5 h-5" />,
      desc: 'Petunjuk Penggunaan Sistem'
    },
    {
      id: 'about',
      label: 'Tentang',
      icon: <Info className="w-5 h-5" />,
      desc: 'Informasi Model & Metrik'
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Section */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center p-1 overflow-hidden shadow-inner">
              <img
                src="/icon_sidebar.png"
                alt="Brand"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 tracking-wide uppercase">
                CREDIT SCORING
              </h2>
              <p className="text-[11px] text-sky-400 font-medium">Risk Rating Classifier</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 flex-1">
          <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu Utama
          </div>

          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <div className="text-left">
                    <div className="font-semibold">{item.label}</div>
                    <div className={`text-[11px] ${isActive ? 'text-sky-100' : 'text-slate-400'}`}>
                      {item.desc}
                    </div>
                  </div>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </nav>

        {/* Footer info box */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Model C5.0 Status</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tervalidasi aktif. Akurasi 92.4% pada 775 kasus evaluasi.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
