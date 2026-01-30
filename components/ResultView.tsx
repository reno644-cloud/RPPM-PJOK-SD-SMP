import React from 'react';
import { Copy, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

interface Props {
  content: string;
  onBack: () => void;
}

const ResultView: React.FC<Props> = ({ content, onBack }) => {
  const handleCopyToDocs = async () => {
    try {
      const outputElement = document.getElementById('rppm-output');
      if (!outputElement) return;

      // 1. Copy HTML for rich text applications (Word, Docs)
      const htmlContent = outputElement.innerHTML;
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
      const textBlob = new Blob([outputElement.innerText], { type: 'text/plain' });

      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        }),
      ]);

      // 2. Open Google Docs
      const newWindow = window.open('https://docs.new', '_blank');
      
      // 3. Inform User
      alert("Konten berhasil disalin! Tab Google Dokumen baru telah dibuka. Tekan Ctrl+V (Paste) di dokumen kosong tersebut.");

    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Gagal menyalin otomatis. Silakan blok manual dan copy.');
    }
  };

  return (
    <div className="bg-slate-900 shadow-xl shadow-black/20 rounded-2xl overflow-hidden border border-slate-800">
      <div className="bg-green-700 p-4 text-white flex justify-between items-center sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-green-800 rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            RPPM Berhasil Dibuat
          </h2>
        </div>
        <button
          onClick={handleCopyToDocs}
          className="bg-white text-green-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-50 active:bg-green-100 transition shadow flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Salin & Buka di Google Dokumen
        </button>
      </div>

      <div className="p-8 bg-slate-950 min-h-[600px] overflow-auto">
        {/* Container for the actual content to be copied */}
        {/* We keep this white and black text to simulate the paper document */}
        <div 
          id="rppm-output" 
          className="rppm-output bg-white text-black p-12 shadow-md shadow-black/50 border border-slate-700 mx-auto max-w-[210mm] text-justify"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default ResultView;