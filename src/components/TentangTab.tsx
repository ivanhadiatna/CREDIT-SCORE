import React, { useState } from 'react';
import {
  Info,
  TrendingDown,
  ShieldAlert,
  GitGraph,
  CheckCircle,
  AlertTriangle,
  ZoomIn,
  X,
  Layers
} from 'lucide-react';

export const TentangTab: React.FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const ratingLevels = [
    {
      level: 1,
      name: 'Rating 1 (Sangat Rendah / Sangat Aman)',
      desc: 'Peminjam memiliki profil finansial luar biasa prima: rasio beban hutang sangat kecil (<= 0.05) atau berpendapatan tinggi dengan rekam jejak stabil.',
      action: 'Rekomendasi persetujuan prioritas (auto-approval) dengan bunga paling kompetitif.',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      level: 2,
      name: 'Rating 2 (Rendah / Aman)',
      desc: 'Peminjam berisiko rendah dengan tanggungan kecil (<= 2) dan masa kerja memadai. Kapasitas pembayaran sangat dapat diandalkan.',
      action: 'Disetujui untuk pembiayaan reguler.',
      badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    },
    {
      level: 3,
      name: 'Rating 3 (Sedang / Moderat)',
      desc: 'Kategori tanggungan 3-4 orang atau tenor panjang (> 36 bulan) dengan rasio hutang sedang. Memerlukan verifikasi pendapatan.',
      action: 'Persetujuan bersyarat dengan verifikasi tambahan bukti slip gaji atau rekening koran.',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      level: 4,
      name: 'Rating 4 (Tinggi / Berisiko)',
      desc: 'Jumlah tanggungan besar (> 4 orang) atau rasio beban hutang melebihi batas ideal. Risiko gagal bayar cukup signifikan.',
      action: 'Diperlukan jaminan (collateral) yang kuat atau penyesuaian plafon pinjaman.',
      badge: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    },
    {
      level: 5,
      name: 'Rating 5 (Sangat Tinggi / Sangat Berisiko)',
      desc: 'Tingkat risiko tertinggi: kombinasi tanggungan banyak (> 4 orang) dengan beban hutang tinggi (> 4.9 hingga > 14.2) atau tenor panjang dengan aset minim.',
      action: 'Sangat disarankan untuk ditolak atau ditinjau secara khusus oleh komite kredit risiko.',
      badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Primary About Callout */}
      <div className="bg-slate-850 rounded-2xl border border-sky-500/30 p-5 sm:p-6 shadow-xl bg-slate-900/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500"></div>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-sky-300 tracking-wide uppercase">
              TENTANG SISTEM CREDIT SCORING & RISIKO KREDIT
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Landasan teori penilaian risiko kredit dan implementasi algoritma C5.0.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed text-justify pl-2">
          <p>
            <strong>Credit score</strong> adalah nilai risiko yang diberikan kepada seorang individu atau organisasi yang mengajukan pinjaman berdasarkan rekam jejak pinjaman dan pembayaran yang dilakukan.
          </p>
          <p>
            <strong>Credit risk</strong> adalah risiko yang harus ditanggung oleh seorang individu atau lembaga ketika memberikan pinjaman — biasanya dalam bentuk uang — ke individu atau pihak lain.
          </p>

          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 text-xs">
            <p className="font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              Risiko gagal bayar pokok dan bunga pinjaman dapat mengakibatkan kerugian:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
              <li>
                <span className="text-slate-200 font-medium">Gangguan aliran kas (cash flow):</span> Mengakibatkan modal kerja lembaga penyalur dana terganggu dan menahan likuiditas.
              </li>
              <li>
                <span className="text-slate-200 font-medium">Peningkatan biaya operasional:</span> Munculnya biaya ekstra penagihan (collection), administrasi hukum, dan provisi kerugian piutang.
              </li>
            </ul>
          </div>

          <p>
            Untuk memperkecil risiko kredit ini, dilakukan proses evaluasi yang disebut dengan <strong>credit scoring</strong> dan <strong>credit rating</strong> terhadap pihak peminjam.
          </p>
          <p className="text-sky-300 font-medium">
            Aplikasi ini diperuntukkan untuk membantu memberikan penilaian kredit (Credit Scoring), mengklasifikasikan apakah calon peminjam tergolong memiliki profil risiko yang aman atau sangat berisiko.
          </p>
        </div>
      </div>

      {/* Decision Tree Model Visualization */}
      <div className="bg-slate-850 rounded-2xl border border-indigo-500/30 p-5 sm:p-6 shadow-xl bg-slate-900/90">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <GitGraph className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Visualisasi Arsitektur Model Pohon Keputusan C5.0
              </h3>
              <p className="text-xs text-slate-400">
                Plot struktur pohon klasifikasi hasil training pada dataset kredit perbankan.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div
            onClick={() => setModalImage('/plot_zoom_png.png')}
            className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-2 cursor-pointer shadow-lg"
          >
            <img
              src="/plot_zoom_png.png"
              alt="Plot Pohon Keputusan C5.0"
              className="w-full h-auto max-h-72 object-contain rounded group-hover:scale-[1.01] transition-transform"
            />
            <div className="absolute inset-0 bg-indigo-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <ZoomIn className="w-3.5 h-3.5 text-indigo-400" /> Perbesar Diagram Pohon
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Statistik & Metrik Evaluasi Model</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Jumlah Kasus Uji</span>
                  <span className="text-sm font-bold text-sky-400">775 Debitur</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Tingkat Akurasi</span>
                  <span className="text-sm font-bold text-emerald-400">92.4%</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Tingkat Error</span>
                  <span className="text-sm font-bold text-amber-400">7.6% (59 kasus)</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Jumlah Node Cabang</span>
                  <span className="text-sm font-bold text-indigo-400">40 Rule Nodes</span>
                </div>
              </div>
            </div>

            <p className="leading-relaxed text-slate-400">
              Model C5.0 bekerja dengan menghitung rasio perolehan informasi (<em>Information Gain Ratio</em>) pada setiap simpul untuk membagi calon debitur secara optimal berdasarkan variabel usia, tanggungan, beban hutang, pendapatan, tenor, dan aset.
            </p>
          </div>
        </div>
      </div>

      {/* Risk Rating Classification Matrix */}
      <div className="bg-slate-850 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl bg-slate-900/90">
        <h3 className="text-base font-bold text-slate-100 mb-3 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-sky-400" />
          <span>Matriks & Kategori Tingkat Risiko Kredit (Rating 1 - 5)</span>
        </h3>
        <div className="space-y-3">
          {ratingLevels.map((lvl) => (
            <div
              key={lvl.level}
              className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${lvl.badge}`}>
                  {lvl.name}
                </span>
                <span className="text-[11px] text-slate-400">Tingkat {lvl.level}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-1">{lvl.desc}</p>
              <div className="text-[11px] text-sky-300 font-medium">
                Tindakan Bank: <span className="text-slate-400">{lvl.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal Zoom */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-4 overflow-hidden relative shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
              <span className="text-sm font-semibold text-slate-200">
                Pohon Keputusan Klasifikasi Risiko Debitur (C5.0 Model)
              </span>
              <button
                onClick={() => setModalImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-slate-950 rounded-xl p-2 max-h-[80vh] overflow-auto">
              <img
                src={modalImage}
                alt="Decision Tree"
                className="max-h-[75vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
