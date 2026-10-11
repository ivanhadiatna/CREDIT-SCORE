import React, { useState, useEffect } from 'react';
import { User, Borrower } from './types';
import { getStoredDebitur, saveStoredDebitur } from './data/mockData';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { Sidebar, TabType } from './components/Sidebar';
import { InputDataTab } from './components/InputDataTab';
import { UploadDataTab } from './components/UploadDataTab';
import { BantuanTab } from './components/BantuanTab';
import { TentangTab } from './components/TentangTab';
import { FileEdit, UploadCloud } from 'lucide-react';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('credit_scoring_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<TabType>('prediksi');
  const [subTab, setSubTab] = useState<'input' | 'upload'>('input');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [debiturList, setDebiturList] = useState<Borrower[]>(() => getStoredDebitur());

  // Keep localStorage synced
  useEffect(() => {
    saveStoredDebitur(debiturList);
  }, [debiturList]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('credit_scoring_current_user', JSON.stringify(user));
    } catch (err) {
      console.warn(err);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('credit_scoring_current_user');
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAddDebitur = (borrower: Borrower) => {
    setDebiturList((prev) => [borrower, ...prev]);
  };

  const handleUpdateDebitur = (borrower: Borrower) => {
    setDebiturList((prev) =>
      prev.map((item) => (item.id === borrower.id ? borrower : item))
    );
  };

  const handleDeleteDebitur = (id: string) => {
    setDebiturList((prev) => prev.filter((item) => item.id !== id));
  };

  // If not logged in, render Login Page
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        user={currentUser}
        onLogout={handleLogout}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Tab: Klasifikasi (Prediksi) */}
            {activeTab === 'prediksi' && (
              <div className="space-y-6">
                {/* SubTab switcher matching bs4Dash tabBox */}
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <button
                    onClick={() => setSubTab('input')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                      subTab === 'input'
                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <FileEdit className="w-4 h-4" />
                    <span>Input Data (Formulir Tunggal)</span>
                  </button>

                  <button
                    onClick={() => setSubTab('upload')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                      subTab === 'upload'
                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Data (Batch Excel)</span>
                  </button>
                </div>

                {subTab === 'input' && (
                  <InputDataTab
                    debiturList={debiturList}
                    onAddDebitur={handleAddDebitur}
                    onUpdateDebitur={handleUpdateDebitur}
                    onDeleteDebitur={handleDeleteDebitur}
                  />
                )}

                {subTab === 'upload' && <UploadDataTab />}
              </div>
            )}

            {/* Tab: Bantuan (Help) */}
            {activeTab === 'help' && <BantuanTab />}

            {/* Tab: Tentang (About) */}
            {activeTab === 'about' && <TentangTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
