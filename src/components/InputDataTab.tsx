import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Send,
  Edit3,
  RotateCcw,
  Trash2,
  FileSpreadsheet,
  Download,
  Calendar,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Borrower, PredictionResult } from '../types';
import { predictCreditRisk } from '../services/creditScoringModel';

interface InputDataTabProps {
  debiturList: Borrower[];
  onAddDebitur: (debitur: Borrower) => void;
  onUpdateDebitur: (debitur: Borrower) => void;
  onDeleteDebitur: (id: string) => void;
}

export const InputDataTab: React.FC<InputDataTabProps> = ({
  debiturList,
  onAddDebitur,
  onUpdateDebitur,
  onDeleteDebitur,
}) => {
  // Compute next ID
  const nextId = useMemo(() => {
    let maxNum = 0;
    debiturList.forEach((d) => {
      const match = d.id.match(/CNS-(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });
    return `CNS-${maxNum + 1}`;
  }, [debiturList]);

  // Form State
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [id, setId] = useState<string>(nextId);
  const [nama, setNama] = useState<string>('');
  const [age, setAge] = useState<number | string>(30);
  const [dependents, setDependents] = useState<number | string>(1);
  const [income, setIncome] = useState<number | string>(15.0);
  const [tenor, setTenor] = useState<number | string>(24);
  const [debt, setDebt] = useState<number | string>(0.05);
  const [empyear, setEmpyear] = useState<number | string>(4);
  const [asset, setAsset] = useState<number | string>(350);
  const [riskrating, setRiskrating] = useState<string>('-');
  const [predictionDetail, setPredictionDetail] = useState<PredictionResult | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [showDownloadBox, setShowDownloadBox] = useState(false);
  const [dateFrom, setDateFrom] = useState('2020-01-01');
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 10));

  // Sync id when nextId changes and not editing
  React.useEffect(() => {
    if (!selectedId) {
      setId(nextId);
    }
  }, [nextId, selectedId]);

  // Calculate prediction (Proses)
  const handleProses = () => {
    const f = {
      income: Number(income) || 0,
      tenor: Number(tenor) || 0,
      dependents: Number(dependents) || 0,
      age: Number(age) || 0,
      empyear: Number(empyear) || 0,
      debt: Number(debt) || 0,
      asset: Number(asset) || 0,
    };
    const result = predictCreditRisk(f);
    setRiskrating(result.riskCode);
    setPredictionDetail(result);
  };

  // Submit new candidate
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert('Nama calon debitur wajib diisi!');
      return;
    }

    // Auto calculate if not calculated yet
    let finalRating = riskrating;
    if (finalRating === '-' || !finalRating) {
      const res = predictCreditRisk({
        income: Number(income) || 0,
        tenor: Number(tenor) || 0,
        dependents: Number(dependents) || 0,
        age: Number(age) || 0,
        empyear: Number(empyear) || 0,
        debt: Number(debt) || 0,
        asset: Number(asset) || 0,
      });
      finalRating = res.riskCode;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newBorrower: Borrower = {
      id: id || nextId,
      nama: nama.trim(),
      age: Number(age) || 0,
      dependents: Number(dependents) || 0,
      income: Number(income) || 0,
      empyear: Number(empyear) || 0,
      debt: Number(debt) || 0,
      tenor: Number(tenor) || 0,
      asset: Number(asset) || 0,
      riskrating: finalRating,
      tanggal: formattedDate,
    };

    onAddDebitur(newBorrower);
    handleReset();
  };

  // Edit existing candidate
  const handleEdit = () => {
    if (!selectedId) return;
    if (!nama.trim()) {
      alert('Nama calon debitur wajib diisi!');
      return;
    }

    let finalRating = riskrating;
    if (finalRating === '-' || !finalRating) {
      const res = predictCreditRisk({
        income: Number(income) || 0,
        tenor: Number(tenor) || 0,
        dependents: Number(dependents) || 0,
        age: Number(age) || 0,
        empyear: Number(empyear) || 0,
        debt: Number(debt) || 0,
        asset: Number(asset) || 0,
      });
      finalRating = res.riskCode;
    }

    const existing = debiturList.find((d) => d.id === selectedId);
    const updatedBorrower: Borrower = {
      id: selectedId,
      nama: nama.trim(),
      age: Number(age) || 0,
      dependents: Number(dependents) || 0,
      income: Number(income) || 0,
      empyear: Number(empyear) || 0,
      debt: Number(debt) || 0,
      tenor: Number(tenor) || 0,
      asset: Number(asset) || 0,
      riskrating: finalRating,
      tanggal: existing?.tanggal || new Date().toISOString(),
    };

    onUpdateDebitur(updatedBorrower);
    handleReset();
  };

  // Delete
  const handleDelete = () => {
    if (!selectedId) return;
    if (confirm(`Apakah Anda yakin ingin menghapus data calon debitur ${id} (${nama})?`)) {
      onDeleteDebitur(selectedId);
      handleReset();
    }
  };

  // Reset form
  const handleReset = () => {
    setSelectedId(null);
    setId(nextId);
    setNama('');
    setAge(0);
    setDependents(0);
    setIncome(0);
    setTenor(0);
    setDebt(0);
    setEmpyear(0);
    setAsset(0);
    setRiskrating('-');
    setPredictionDetail(null);
  };

  // Select row from table
  const handleSelectRow = (item: Borrower) => {
    if (selectedId === item.id) {
      // Toggle unselect
      handleReset();
      return;
    }

    setSelectedId(item.id);
    setId(item.id);
    setNama(item.nama);
    setAge(item.age);
    setDependents(item.dependents);
    setIncome(item.income);
    setTenor(item.tenor);
    setDebt(item.debt);
    setEmpyear(item.empyear);
    setAsset(item.asset);
    setRiskrating(item.riskrating);

    // Predict details for inspection
    const res = predictCreditRisk({
      income: item.income,
      tenor: item.tenor,
      dependents: item.dependents,
      age: item.age,
      empyear: item.empyear,
      debt: item.debt,
      asset: item.asset,
    });
    setPredictionDetail(res);
  };

  // Filtered debitur list
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return debiturList;
    const q = searchQuery.toLowerCase();
    return debiturList.filter(
      (d) =>
        d.id.toLowerCase().includes(q) ||
        d.nama.toLowerCase().includes(q) ||
        d.riskrating.includes(q)
    );
  }, [debiturList, searchQuery]);

  // Export CSV based on Date filter
  const handleExportCSV = () => {
    const from = new Date(dateFrom).getTime();
    const to = new Date(dateTo).setHours(23, 59, 59, 999);

    const filtered = debiturList.filter((d) => {
      const dTime = new Date(d.tanggal).getTime();
      return dTime >= from && dTime <= to;
    });

    if (filtered.length === 0) {
      alert('Tidak ada data dalam rentang tanggal tersebut!');
      return;
    }

    const headers = ['id', 'nama', 'age', 'dependents', 'income', 'empyear', 'debt', 'tenor', 'asset', 'riskrating', 'tanggal'];
    const rows = filtered.map((d) => [
      `"${d.id}"`,
      `"${d.nama.replace(/"/g, '""')}"`,
      d.age,
      d.dependents,
      d.income,
      d.empyear,
      d.debt,
      d.tenor,
      d.asset,
      `"${d.riskrating}"`,
      `"${d.tanggal}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadgeStyle = (rating: string) => {
    switch (rating) {
      case '1':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case '2':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case '3':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case '4':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case '5':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Data Card */}
      <div className="bg-slate-850 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl bg-slate-900/90">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Form Input Calon Debitur</span>
              {selectedId ? (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Mode Edit ({selectedId})
                </span>
              ) : (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Mode Entri Baru
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Masukkan variabel prediktor peminjam untuk menentukan klasifikasi risiko kredit secara otomatis.
            </p>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Id
              </label>
              <input
                type="text"
                disabled
                value={id}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 text-sm font-mono cursor-not-allowed select-none"
              />
            </div>

            {/* Nama */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Nama <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Calon Debitur"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Age (Tahun)
              </label>
              <input
                type="number"
                min={0}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Dependents */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Dependents (Tanggungan)
              </label>
              <input
                type="number"
                min={0}
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Income */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Income (Pendapatan)
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Tenor */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Tenor (Bulan)
              </label>
              <input
                type="number"
                min={0}
                value={tenor}
                onChange={(e) => setTenor(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Debt */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Debt (Beban Hutang)
              </label>
              <input
                type="number"
                step="0.001"
                min={0}
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Empyear */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Empyear (Masa Kerja Thn)
              </label>
              <input
                type="number"
                min={0}
                value={empyear}
                onChange={(e) => setEmpyear(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Asset */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Asset (Total Nilai Aset)
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Riskrating Output */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Riskrating (Hasil)
              </label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value={riskrating}
                  placeholder="-"
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm font-bold text-center cursor-not-allowed select-none ${
                    riskrating !== '-'
                      ? getBadgeStyle(riskrating)
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Decision tree rule path alert if calculated */}
          {predictionDetail && (
            <div className="mt-4 p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-sky-200">
              <div className="flex items-center gap-2 font-semibold text-sky-300 mb-1">
                <Info className="w-4 h-4 text-sky-400" />
                <span>{predictionDetail.ratingLabel}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Jalur evaluasi pohon keputusan C5.0:{' '}
                <span className="font-mono text-sky-300 font-semibold">
                  {predictionDetail.decisionRule.join(' ➔ ')}
                </span>
              </p>
            </div>
          )}

          {/* Action Buttons Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleProses}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/30 cursor-pointer active:scale-95"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Proses</span>
              </button>

              <button
                type="submit"
                disabled={Boolean(selectedId)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer shadow-md ${
                  selectedId
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 active:scale-95'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>

              <button
                type="button"
                onClick={handleEdit}
                disabled={!selectedId}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  !selectedId
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30 active:scale-95'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold text-xs transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={!selectedId}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  !selectedId
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-rose-600/80 hover:bg-rose-600 text-white shadow-md shadow-rose-600/30 active:scale-95'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>

            {/* Save to Excel toggle button */}
            <button
              type="button"
              onClick={() => setShowDownloadBox(!showDownloadBox)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-sky-400 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{showDownloadBox ? 'Tutup Filter Excel' : 'Save To Excel'}</span>
            </button>
          </div>
        </form>

        {/* Collapsible Save to Excel Box */}
        {showDownloadBox && (
          <div className="mt-5 p-4 rounded-xl bg-slate-800/80 border border-sky-500/30 animate-fadeIn">
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-sky-400" />
              Filter & Unduh Rekap Data (CSV / Excel)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Dari Tanggal</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Sampai Tanggal</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Responses Data Table */}
      <div className="bg-slate-850 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl bg-slate-900/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Daftar Calon Debitur</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {filteredList.length} data
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Klik baris pada tabel untuk melihat, mengedit, atau menghapus data peminjam.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ID / Nama / Rating..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-800/90 text-slate-300 font-semibold border-b border-slate-700">
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">Nama</th>
                <th className="py-3 px-2 text-right">Age</th>
                <th className="py-3 px-2 text-right">Dep.</th>
                <th className="py-3 px-2 text-right">Income</th>
                <th className="py-3 px-2 text-right">Emp.</th>
                <th className="py-3 px-2 text-right">Debt</th>
                <th className="py-3 px-2 text-right">Tenor</th>
                <th className="py-3 px-2 text-right">Asset</th>
                <th className="py-3 px-3 text-center">Risk Rating</th>
                <th className="py-3 px-3">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-500">
                    Tidak ada data debitur yang cocok.
                  </td>
                </tr>
              ) : (
                filteredList.map((row) => {
                  const isSelected = selectedId === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => handleSelectRow(row)}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-sky-950/60 font-medium'
                          : 'hover:bg-slate-800/50 text-slate-300'
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-semibold text-sky-400">
                        {row.id}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-200">{row.nama}</td>
                      <td className="py-2.5 px-2 text-right">{row.age}</td>
                      <td className="py-2.5 px-2 text-right">{row.dependents}</td>
                      <td className="py-2.5 px-2 text-right">{row.income.toFixed(2)}</td>
                      <td className="py-2.5 px-2 text-right">{row.empyear}</td>
                      <td className="py-2.5 px-2 text-right">{row.debt}</td>
                      <td className="py-2.5 px-2 text-right">{row.tenor}</td>
                      <td className="py-2.5 px-2 text-right">{row.asset}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getBadgeStyle(
                            row.riskrating
                          )}`}
                        >
                          Rating {row.riskrating}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px] font-mono">
                        {row.tanggal}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
