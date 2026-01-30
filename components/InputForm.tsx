import React, { useEffect } from 'react';
import { FormData, GRADUATE_DIMENSIONS, PEDAGOGICAL_OPTIONS, PedagogicalMethod } from '../types';
import { Plus, Trash2, BookOpen, User, School, Clock, Dumbbell, Award, GripHorizontal } from 'lucide-react';

interface Props {
  data: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<Props> = ({ data, onChange, onSubmit, isLoading }) => {
  
  const handleChange = (field: keyof FormData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleDimensionToggle = (dim: string) => {
    const current = data.graduateDimensions;
    if (current.includes(dim)) {
      handleChange('graduateDimensions', current.filter(d => d !== dim));
    } else {
      handleChange('graduateDimensions', [...current, dim]);
    }
  };

  // Sync pedagogical practices array size with meeting count
  useEffect(() => {
    const count = data.meetingCount || 1;
    if (data.pedagogicalPractices.length !== count) {
      const newPractices = Array.from({ length: count }, (_, i) => {
        return data.pedagogicalPractices[i] || { meetingNumber: i + 1, method: PedagogicalMethod.GameBased };
      });
      handleChange('pedagogicalPractices', newPractices);
    }
  }, [data.meetingCount]);

  const updatePractice = (index: number, method: string) => {
    const newPractices = [...data.pedagogicalPractices];
    newPractices[index] = { ...newPractices[index], method };
    handleChange('pedagogicalPractices', newPractices);
  };

  const isValid = data.schoolName && data.teacherName && data.material && data.meetingCount > 0;

  const inputClass = "w-full px-4 py-2 border border-slate-700 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition placeholder-slate-500";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1";
  const sectionHeaderClass = "text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2 mb-4 flex items-center gap-2";

  return (
    <div className="bg-slate-900 shadow-xl shadow-black/20 rounded-2xl overflow-hidden border border-slate-800">
      
      {/* Header dengan Background Gambar Aktivitas Olahraga */}
      <div className="relative bg-red-600 p-8 text-white text-center overflow-hidden group">
        {/* Gambar Background (Anak SD Olahraga) */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=1000&auto=format&fit=crop")',
            opacity: 0.25 
          }}
        ></div>
        
        {/* Overlay Gradient agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/80 to-red-900/90 mix-blend-multiply"></div>

        {/* Konten Header */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3 drop-shadow-lg">
            <BookOpen className="w-8 h-8" />
            RPM PJOK SUNGAISELAN
          </h2>
          <p className="text-red-50 mt-2 text-sm font-medium tracking-wide drop-shadow-md">
            Lengkapi data berikut untuk men-generate RPPM
          </p>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Section 1: Identitas Sekolah & Guru */}
        <section>
          <h3 className={sectionHeaderClass}>
            <School className="w-5 h-5 text-red-500" />
            Identitas Sekolah & Pendidik
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Nama Satuan Pendidikan</label>
              <input 
                type="text" 
                className={inputClass}
                placeholder="SD Negeri 1 Sungaiselan"
                value={data.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Jenjang Pendidikan</label>
              <select 
                className={inputClass}
                value={data.level}
                onChange={(e) => handleChange('level', e.target.value)}
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Nama Guru</label>
              <input 
                type="text" 
                className={inputClass}
                placeholder="Nama Lengkap dengan Gelar"
                value={data.teacherName}
                onChange={(e) => handleChange('teacherName', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>NIP Guru</label>
              <input 
                type="text" 
                className={inputClass}
                placeholder="NIP (Opsi: - jika tidak ada)"
                value={data.teacherNip}
                onChange={(e) => handleChange('teacherNip', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Nama Kepala Sekolah</label>
              <input 
                type="text" 
                className={inputClass}
                value={data.principalName}
                onChange={(e) => handleChange('principalName', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>NIP Kepala Sekolah</label>
              <input 
                type="text" 
                className={inputClass}
                value={data.principalNip}
                onChange={(e) => handleChange('principalNip', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Kelas</label>
              <input 
                type="text" 
                className={inputClass}
                placeholder="Contoh: IV (Empat)"
                value={data.grade}
                onChange={(e) => handleChange('grade', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Semester</label>
              <select 
                className={inputClass}
                value={data.semester}
                onChange={(e) => handleChange('semester', e.target.value)}
              >
                <option value="Ganjil">1 (Ganjil)</option>
                <option value="Genap">2 (Genap)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Mata Pelajaran</label>
              <input 
                type="text" 
                className={inputClass}
                value={data.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Materi & Tujuan */}
        <section>
          <h3 className={sectionHeaderClass}>
            <GripHorizontal className="w-5 h-5 text-red-500" />
            Detail Pembelajaran
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Capaian Pembelajaran (CP)</label>
              <textarea 
                className={`${inputClass} h-24`}
                placeholder="Salin CP dari kurikulum..."
                value={data.learningOutcomes}
                onChange={(e) => handleChange('learningOutcomes', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Tujuan Pembelajaran (TP)</label>
              <textarea 
                className={`${inputClass} h-24`}
                placeholder="Rumuskan tujuan pembelajaran..."
                value={data.learningObjectives}
                onChange={(e) => handleChange('learningObjectives', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Materi Pelajaran</label>
              <input 
                type="text" 
                className={inputClass}
                placeholder="Contoh: Permainan Bola Besar (Sepak Bola)"
                value={data.material}
                onChange={(e) => handleChange('material', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Waktu & Metode */}
        <section>
          <h3 className={sectionHeaderClass}>
            <Clock className="w-5 h-5 text-red-500" />
            Alokasi Waktu & Metode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className={labelClass}>Jumlah Pertemuan</label>
              <input 
                type="number" 
                min="1"
                max="10"
                className={inputClass}
                value={data.meetingCount}
                onChange={(e) => handleChange('meetingCount', parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <label className={labelClass}>Durasi per Pertemuan</label>
              <input 
                type="text" 
                className={inputClass}
                placeholder="Contoh: 3 x 35 Menit"
                value={data.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-3 bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h4 className="font-medium text-slate-300 text-sm">Praktik Pedagogis per Pertemuan</h4>
            {data.pedagogicalPractices.map((practice, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-400 w-24">Pertemuan {practice.meetingNumber}</span>
                <select
                  className="flex-1 px-3 py-2 border border-slate-600 bg-slate-700 text-white rounded focus:ring-2 focus:ring-red-500 outline-none text-sm"
                  value={practice.method}
                  onChange={(e) => updatePractice(index, e.target.value)}
                >
                  {PEDAGOGICAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Dimensi Lulusan */}
        <section>
          <h3 className={sectionHeaderClass}>
            <Award className="w-5 h-5 text-red-500" />
            Dimensi Lulusan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GRADUATE_DIMENSIONS.map((dim) => (
              <label key={dim} className={`
                flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all select-none
                ${data.graduateDimensions.includes(dim) 
                  ? 'bg-red-900/30 border-red-500 text-red-300 ring-1 ring-red-500' 
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-400'}
              `}>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={data.graduateDimensions.includes(dim)}
                  onChange={() => handleDimensionToggle(dim)}
                />
                <span className="text-sm font-medium">{dim}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onSubmit}
            disabled={isLoading || !isValid}
            className={`
              w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all
              ${isLoading || !isValid 
                ? 'bg-slate-700 cursor-not-allowed text-slate-500' 
                : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 hover:scale-[1.01] active:scale-[0.99] shadow-red-900/20'}
            `}
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Sedang Membuat RPPM... (Mohon Tunggu)
              </>
            ) : (
              <>
                <Dumbbell className="w-6 h-6" />
                Generate RPPM PJOK
              </>
            )}
          </button>
          {!isValid && (
            <p className="text-center text-red-400 text-sm mt-2">Harap lengkapi semua kolom wajib (Sekolah, Guru, Materi, Pertemuan).</p>
          )}

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Aplikasi ini di buat oleh Reno Aprial, S.pd_SDN21SUNGAISELAN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;