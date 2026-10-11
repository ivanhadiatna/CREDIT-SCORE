import React, { useState } from 'react';
import { HelpCircle, Edit, FileSpreadsheet, ZoomIn, X, Info } from 'lucide-react';

export const BantuanTab: React.FC = () => {
  const [modalImage, setModalImage] = useState<{ src: string; caption: string } | null>(null);

  return (
    <div className="space-y-6">
      {/* Callout 1: CARA MEMPREDIKSI */}
      <div className="bg-slate-850 rounded-2xl border border-sky-500/30 p-5 sm:p-6 shadow-xl bg-slate-900/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500"></div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-sky-300 tracking-wide uppercase">
              CARA MEMPREDIKSI
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              Untuk melakukan prediksi risiko kredit pada aplikasi ini terdapat 2 cara yaitu{' '}
              <strong className="text-white">Input Data</strong> dan{' '}
              <strong className="text-white">Upload Data</strong>. Pada input data, pengguna harus memasukkan satu persatu data nasabah yang dibutuhkan untuk melakukan prediksi setelah itu dapat disimpan ke database. Sedangkan pada upload data diperuntukkan untuk jumlah data yang lebih besar dan disimpan pada file spreadsheet (Excel / CSV).
            </p>
          </div>
        </div>
      </div>

      {/* Callout 2: INPUT DATA */}
      <div className="bg-slate-850 rounded-2xl border border-indigo-500/30 p-5 sm:p-6 shadow-xl bg-slate-900/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <Edit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-indigo-300 tracking-wide uppercase">
              PANDUAN INPUT DATA (MANUAL SINGLE ENTRY)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Langkah demi langkah melakukan entri, evaluasi model, penyimpanan, pembaruan, dan penghapusan data nasabah.
            </p>
          </div>
        </div>

        <div className="space-y-5 text-sm text-slate-300 pl-2">
          {/* Step 1 */}
          <div className="space-y-3">
            <p className="leading-relaxed text-justify">
              <strong>1. Pengisian Form & Klasifikasi:</strong> Untuk melakukan prediksi dengan cara input data, cukup masukkan data nasabah pada masing-masing field input (Nama, Age, Dependents, Income, Tenor, Debt, Empyear, Asset). Kemudian klik tombol <span className="text-indigo-400 font-semibold">"Proses"</span>, maka hasil prediksi nilai risiko kredit nasabah akan otomatis dihitung dan ditampilkan pada kolom <em>riskrating</em>. Kemudian data dapat disimpan ke database dengan mengklik tombol <span className="text-sky-400 font-semibold">"Submit"</span>.
            </p>
            <div
              onClick={() => setModalImage({ src: '/help01_1.PNG', caption: 'Form Input Data & Proses Prediksi' })}
              className="group relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/60 p-2 cursor-pointer max-w-2xl mx-auto shadow-md"
            >
              <img
                src="/help01_1.PNG"
                alt="Form Input Data"
                className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" /> Klik untuk memperbesar
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <p className="leading-relaxed text-justify">
              <strong>2. Tampilan Data Tersimpan:</strong> Data yang telah tersimpan akan ditampilkan pada tabel output di bagian bawah form, lengkap dengan tanggal entri dan kalkulasi ratingnya.
            </p>
            <div
              onClick={() => setModalImage({ src: '/help01_2.png', caption: 'Tabel Output Calon Debitur' })}
              className="group relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/60 p-2 cursor-pointer max-w-2xl mx-auto shadow-md"
            >
              <img
                src="/help01_2.png"
                alt="Tabel Output"
                className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" /> Klik untuk memperbesar
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <p className="leading-relaxed text-justify">
              <strong>3. Mengubah & Menghapus Data:</strong> Untuk merubah data, cukup pilih baris data yang ingin dirubah pada tabel, maka seluruh data akan kembali ditampilkan pada form di atas. Setelah itu rubah data pada input tersebut dan klik tombol <span className="text-amber-400 font-semibold">"Edit"</span>. Untuk menghapus data, pilih baris yang akan dihapus kemudian klik tombol <span className="text-rose-400 font-semibold">"Delete"</span>.
            </p>
            {/* If help01_3 exists */}
            <div
              onClick={() => setModalImage({ src: '/help01_3.png', caption: 'Edit dan Hapus Data Debitur' })}
              className="group relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/60 p-2 cursor-pointer max-w-2xl mx-auto shadow-md"
            >
              <img
                src="/help01_3.png"
                alt="Edit dan Hapus Data"
                className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-200"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" /> Klik untuk memperbesar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Callout 3: UPLOAD DATA */}
      <div className="bg-slate-850 rounded-2xl border border-emerald-500/30 p-5 sm:p-6 shadow-xl bg-slate-900/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-300 tracking-wide uppercase">
              PANDUAN UPLOAD DATA (BATCH EXCEL)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cara mengklasifikasi ratusan atau ribuan data nasabah sekaligus melalui spreadsheet Excel.
            </p>
          </div>
        </div>

        <div className="space-y-5 text-sm text-slate-300 pl-2">
          <div className="space-y-3">
            <p className="leading-relaxed text-justify">
              <strong>1. Mengunggah File:</strong> Untuk melakukan klasifikasi dengan cara upload data yaitu klik area upload / file browser, kemudian pilih file Excel (.xlsx) atau CSV yang akan diklasifikasi. Pastikan terdapat kolom variabel prediktor: <code>age, dependents, income, empyear, debt, tenor, asset</code>.
            </p>
            <div
              onClick={() => setModalImage({ src: '/help02_1.png', caption: 'Pilih File Excel untuk Diklasifikasi' })}
              className="group relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/60 p-2 cursor-pointer max-w-2xl mx-auto shadow-md"
            >
              <img
                src="/help02_1.png"
                alt="Upload Excel"
                className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" /> Klik untuk memperbesar
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-800">
            <p className="leading-relaxed text-justify">
              <strong>2. Memproses & Mengunduh Hasil:</strong> Setelah file diunggah, data akan ditampilkan pada tabel preview. Tekan tombol <span className="text-emerald-400 font-semibold">"Proses"</span> untuk mengevaluasi setiap baris dengan model C5.0. Hasil klasifikasi beserta kolom <em>hasil</em> dan kategori risiko akan ditampilkan pada tabel hasil dan dapat langsung diunduh kembali sebagai file Excel dengan menekan tombol <span className="text-emerald-400 font-semibold">"Download"</span>.
            </p>
            <div
              onClick={() => setModalImage({ src: '/help02_2.PNG', caption: 'Hasil Klasifikasi Massal & Tombol Download' })}
              className="group relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/60 p-2 cursor-pointer max-w-2xl mx-auto shadow-md"
            >
              <img
                src="/help02_2.PNG"
                alt="Hasil Klasifikasi"
                className="w-full h-auto object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" /> Klik untuk memperbesar
                </span>
              </div>
            </div>
          </div>
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
              <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400" />
                {modalImage.caption}
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
                src={modalImage.src}
                alt={modalImage.caption}
                className="max-h-[75vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
