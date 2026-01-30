import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultView from './components/ResultView';
import { FormData, PedagogicalMethod } from './types';
import { generateRPPM } from './services/geminiService';
import { Activity } from 'lucide-react';

const INITIAL_DATA: FormData = {
  schoolName: '',
  teacherName: '',
  teacherNip: '',
  principalName: '',
  principalNip: '',
  level: 'SD',
  grade: '',
  semester: 'Ganjil',
  subject: 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
  learningOutcomes: '',
  learningObjectives: '',
  material: '',
  meetingCount: 4,
  duration: '4 x 35 Menit',
  pedagogicalPractices: [
    { meetingNumber: 1, method: PedagogicalMethod.StationLearning },
    { meetingNumber: 2, method: PedagogicalMethod.GameBased },
    { meetingNumber: 3, method: PedagogicalMethod.GameBased },
    { meetingNumber: 4, method: PedagogicalMethod.GameBased }
  ],
  graduateDimensions: [],
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateRPPM(formData);
      setGeneratedContent(result);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-12">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-red-900/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">Generator RPPM PJOK</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">SD SUNGAISELAN</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-red-500 mb-1">APLIKASI dibuat Reno Aprial, S.pd</p>
              <p className="text-xs text-slate-500">Powered by <span className="font-semibold text-slate-300">Google Gemini AI</span></p>
            </div>
            {/* Logo Image */}
            <img 
              src="/ra-logo.png" 
              alt="RA Production" 
              className="h-14 w-auto object-contain drop-shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 text-red-200 rounded-lg flex items-center gap-3 animate-pulse">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {!generatedContent ? (
          <InputForm 
            data={formData} 
            onChange={setFormData} 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        ) : (
          <ResultView 
            content={generatedContent} 
            onBack={() => setGeneratedContent(null)} 
          />
        )}
      </main>

      <footer className="text-center text-slate-500 text-sm py-8">
        &copy; {new Date().getFullYear()} Generator RPPM PJOK SD Sungaiselan. Dibuat dengan Teknologi AI.
      </footer>
    </div>
  );
};

export default App;