import React, { useState } from 'react';
import {
  Upload,
  Wrench,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { predictCreditRisk } from '../services/creditScoringModel';

interface UploadRow {
  [key: string]: any;
}

export const UploadDataTab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [rawData, setRawData] = useState<UploadRow[]>([]);
  const [processedData, setProcessedData] = useState<UploadRow[]>([]);
  const [displayMode, setDisplayMode] = useState<'head' | 'all'>('head');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const firstSheetName = wb.SheetNames[0];
        const ws = wb.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json<UploadRow>(ws, { defval: '' });

        if (jsonData.length === 0) {
          setErrorMsg('File Excel / CSV kosong atau tidak memiliki baris data.');
          setRawData([]);
          setProcessedData([]);
          return;
        }

        setRawData(jsonData);
        setProcessedData([]); // reset processed until 'Proses' is clicked
      } catch (err: any) {
        setErrorMsg(`Gagal membaca file: ${err.message || 'Format tidak didukung'}`);
      }
    };
    reader.readAsBinaryString(selectedFile);
  };

  // Run batch classification
  const handleProses = () => {
    if (rawData.length === 0) {
      setErrorMsg('Silakan pilih dan unggah file Excel terlebih dahulu.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    setTimeout(() => {
      try {
        const results = rawData.map((row) => {
          // Normalize column keys (case-insensitive)
          const findVal = (names: string[]) => {
            for (const key of Object.keys(row)) {
              if (names.includes(key.toLowerCase().trim())) {
                return Number(row[key]) || 0;
              }
            }
            return 0;
          };

          const features = {
            income: findVal(['income', 'pendapatan', 'gaji']),
            tenor: findVal(['tenor', 'jangka_waktu', 'bulan']),
            dependents: findVal(['dependents', 'tanggungan', 'dep']),
            age: findVal(['age', 'usia', 'umur']),
            empyear: findVal(['empyear', 'lama_bekerja', 'masa_kerja']),
            debt: findVal(['debt', 'beban_hutang', 'hutang']),
            asset: findVal(['asset', 'aset', 'kekayaan']),
          };

          const pred = predictCreditRisk(features);

          return {
            ...row,
            hasil: String(pred.riskRating),
            kategori_risiko: pred.riskCategory,
          };
        });

        setProcessedData(results);
      } catch (err: any) {
        setErrorMsg(`Terjadi kesalahan saat memproses data: ${err.message}`);
      } finally {
        setIsProcessing(false);
      }
    }, 150);
  };

  // Download processed Excel
  const handleDownloadResult = () => {
    if (processedData.length === 0) {
      alert('Data hasil belum diproses. Klik tombol "Proses" terlebih dahulu.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(processedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hasil_Klasifikasi');
    const outName = fileName ? `hasil-${fileName}` : 'hasil-klasifikasi-kredit.xlsx';
    XLSX.writeFile(wb, outName);
  };

  // Download sample template for quick testing
  const handleDownloadSample = () => {
    const sampleRows = [
      { nama: 'Dian Permana', age: 32, dependents: 1, income: 18.5, empyear: 6, debt: 0.04, tenor: 12, asset: 450 },
      { nama: 'Roni Suherman', age: 45, dependents: 5, income: 22.0, empyear: 8, debt: 1.50, tenor: 24, asset: 600 },
      { nama: 'Nurlela', age: 28, dependents: 0, income: 10.0, empyear: 2, debt: 0.08, tenor: 36, asset: 200 },
      { nama: 'Agus Setiawan', age: 50, dependents: 6, income: 14.0, empyear: 3, debt: 8.20, tenor: 48, asset: 310 },
      { nama: 'Maya Safitri', age: 36, dependents: 2, income: 25.0, empyear: 10, debt: 0.03, tenor: 18, asset: 800 },
      { nama: 'Wahyu Nugroho', age: 41, dependents: 3, income: 16.0, empyear: 5, debt: 2.10, tenor: 24, asset: 520 },
      { nama: 'Kartika Sari', age: 25, dependents: 1, income: 8.5, empyear: 1, debt: 0.15, tenor: 12, asset: 150 },
    ];

    const ws = XLSX.utils.json_to_sheet(sampleRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contoh_Data');
    XLSX.writeFile(wb, 'contoh_data_calon_debitur.xlsx');
  };

  // Determine rows to render
  const visibleRaw = displayMode === 'head' ? rawData.slice(0, 5) : rawData;
  const visibleProcessed = displayMode === 'head' ? processedData.slice(0, 5) : processedData;

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
      {/* Box Upload */}
      <div className="bg-slate-850 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl bg-slate-900/90">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-sky-400" />
              <span>Klasifikasi Massal (Upload Excel / CSV)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Unggah file spreadsheet yang memuat kolom: <span className="font-mono text-sky-300">age, dependents, income, empyear, debt, tenor, asset</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-sky-400 border border-slate-700 text-xs font-medium transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Contoh File Excel</span>
          </button>
        </div>

        {/* Upload Drop Area */}
        <div className="space-y-4">
          <div className="relative border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-2xl p-6 text-center transition-colors bg-slate-900/60">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-slate-200">
                {fileName ? fileName : 'Pilih File Xlsx / CSV'}
              </div>
              <p className="text-xs text-slate-400">
                {fileName
                  ? `${rawData.length} baris terbaca. Klik "Proses" untuk mulai klasifikasi.`
                  : 'Klik untuk memilih file dari komputer Anda (.xlsx, .csv)'}
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleProses}
                disabled={rawData.length === 0 || isProcessing}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
                  rawData.length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 active:scale-95'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>{isProcessing ? 'Memproses...' : 'Proses'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadResult}
                disabled={processedData.length === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer shadow-md ${
                  processedData.length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 active:scale-95'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download Hasil</span>
              </button>
            </div>

            {/* Display Option: Sebagian (Head) vs Semua */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs">
              <span className="text-slate-400 px-2 font-medium">Tampilkan Data:</span>
              <button
                type="button"
                onClick={() => setDisplayMode('head')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  displayMode === 'head'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sebagian (5)
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  displayMode === 'all'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Semua ({rawData.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table 1: Data (Input Data Preview) */}
      <div className="bg-slate-850 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl bg-slate-900/90">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Data Mentah (Input File)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {visibleRaw.length} dari {rawData.length} baris
            </span>
          </h4>
        </div>

        {visibleRaw.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            Belum ada file yang diunggah. Unggah file .xlsx untuk melihat data.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800/90 text-slate-300 font-semibold border-b border-slate-700">
                  {Object.keys(visibleRaw[0]).map((key) => (
                    <th key={key} className="py-2.5 px-3 uppercase tracking-wider text-[11px]">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {visibleRaw.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 text-slate-300">
                    {Object.keys(visibleRaw[0]).map((key) => (
                      <td key={key} className="py-2 px-3">
                        {String(row[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Table 2: Hasil (Processed Results) */}
      <div className="bg-slate-850 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl bg-slate-900/90">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Hasil Klasifikasi (Model C5.0)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
              {visibleProcessed.length} dari {processedData.length} baris
            </span>
          </h4>
        </div>

        {visibleProcessed.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            Hasil belum tersedia. Klik tombol <span className="text-sky-400 font-semibold">"Proses"</span> di atas untuk mengevaluasi data.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800/90 text-slate-300 font-semibold border-b border-slate-700">
                  {Object.keys(visibleProcessed[0]).map((key) => (
                    <th
                      key={key}
                      className={`py-2.5 px-3 uppercase tracking-wider text-[11px] ${
                        key === 'hasil' || key === 'kategori_risiko' ? 'text-sky-400 font-bold bg-sky-950/40' : ''
                      }`}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {visibleProcessed.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 text-slate-300">
                    {Object.keys(visibleProcessed[0]).map((key) => {
                      if (key === 'hasil') {
                        return (
                          <td key={key} className="py-2 px-3 bg-sky-950/20 font-bold">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] border ${getBadgeStyle(
                                String(row[key])
                              )}`}
                            >
                              Rating {row[key]}
                            </span>
                          </td>
                        );
                      }
                      if (key === 'kategori_risiko') {
                        return (
                          <td key={key} className="py-2 px-3 bg-sky-950/20 font-semibold text-slate-200">
                            {String(row[key])}
                          </td>
                        );
                      }
                      return (
                        <td key={key} className="py-2 px-3">
                          {String(row[key])}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
