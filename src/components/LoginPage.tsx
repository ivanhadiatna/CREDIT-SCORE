import React, { useState } from 'react';
import { User, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { INITIAL_USERS } from '../data/mockData';
import { User as UserType } from '../types';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = INITIAL_USERS.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.passwordHash === password
    );

    if (found) {
      setError(false);
      onLogin({
        username: found.username,
        name: found.name,
        role: found.role
      });
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  const handleQuickFill = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
    setError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 flex flex-col justify-center items-center px-4 py-8">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-600/20 border border-sky-500/30 mb-4 shadow-lg shadow-sky-900/30">
            <img
              src="/icon_sidebar.png"
              alt="Logo"
              className="w-10 h-10 object-contain drop-shadow"
              onError={(e) => {
                // fallback if image not loaded
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            CREDIT SCORING
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sistem Klasifikasi Tingkat Risiko Calon Debitur (C5.0 Decision Tree)
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-slate-850/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl bg-slate-800/80">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-100">LOG IN</h2>
            <p className="text-xs text-slate-400 mt-1">Silakan masukkan kredensial untuk mengakses sistem</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-sky-400" />
                  Username
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username (misal: user1)"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-sky-400" />
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-center text-sm text-rose-400 font-medium animate-shake">
                Masukan Username dan Password Dengan Benar!
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/30 transition-all duration-200 cursor-pointer active:scale-[0.99]"
            >
              <span>MASUK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Preset Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-slate-700/60">
            <p className="text-xs text-slate-400 font-medium mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              Pilih akun demo (klik untuk mengisi cepat):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('user1', 'pass1')}
                className="text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-700/60 border border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer group"
              >
                <div className="font-semibold text-sky-400 flex items-center justify-between">
                  user1
                  <CheckCircle2 className="w-3 h-3 text-slate-500 group-hover:text-sky-400" />
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Analyst / pass1</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('user2', 'pass2')}
                className="text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-700/60 border border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer group"
              >
                <div className="font-semibold text-sky-400 flex items-center justify-between">
                  user2
                  <CheckCircle2 className="w-3 h-3 text-slate-500 group-hover:text-sky-400" />
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Officer / pass2</div>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-slate-500">
          Credit Scoring Decision System &bull; R Shiny to Modern Web
        </div>
      </div>
    </div>
  );
};
