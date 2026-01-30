import { GoogleGenAI } from "@google/genai";
import { FormData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRPPM = async (data: FormData): Promise<string> => {
  const pedagogicalSummary = data.pedagogicalPractices
    .map((p) => `Pertemuan ${p.meetingNumber}: ${p.method}`)
    .join(", ");

  const dimensionsSummary = data.graduateDimensions.join(", ");

  const prompt = `
    Bertindaklah sebagai Konsultan Pendidikan Ahli dan Guru PJOK Senior. Tugas Anda adalah membuat "Perencanaan Pembelajaran Mendalam (RPPM)" yang sangat detail untuk mata pelajaran ${data.subject} di ${data.schoolName}.

    **DATA INPUT:**
    1. Satuan Pendidikan: ${data.schoolName}
    2. Guru: ${data.teacherName} (NIP: ${data.teacherNip})
    3. Kepala Sekolah: ${data.principalName} (NIP: ${data.principalNip})
    4. Jenjang: ${data.level} - Kelas: ${data.grade} - Semester: ${data.semester}
    5. Mata Pelajaran: ${data.subject}
    6. Capaian Pembelajaran (CP): ${data.learningOutcomes}
    7. Tujuan Pembelajaran (TP): ${data.learningObjectives}
    8. Materi: ${data.material}
    9. Alokasi Waktu: ${data.meetingCount} Pertemuan x ${data.duration}
    10. Praktik Pedagogis per Pertemuan: ${pedagogicalSummary}
    11. Dimensi Lulusan: ${dimensionsSummary}

    **INSTRUKSI SPESIFIK & LOGIKA:**
    1. **Format Output:** Keluarkan HANYA kode HTML Table yang valid dan bersih. Gunakan tag <table>, <tr>, <td>, <th>. Jangan gunakan Markdown (\`\`\`). 
       - **Warna & Style:** Gunakan inline style \`color: #000000;\` untuk semua teks. Gunakan \`border: 1px solid #000000;\` untuk tabel. Pastikan output terlihat hitam pekat saat dicopy ke Word.
    2. **Struktur Waktu (Micro-timing):** Untuk setiap pertemuan, bagi durasi waktu menjadi: 15% Kegiatan Awal, 70% Kegiatan Inti, 15% Kegiatan Penutup. Tuliskan durasi menit secara eksplisit di setiap langkah.
    3. **Spesifikasi PJOK:**
       - **Wajib:** Masukkan kegiatan "Pemanasan (Warming up)" di Kegiatan Awal.
       - **Wajib:** Masukkan kegiatan "Pendinginan (Cooling down)" di Kegiatan Penutup.
       - **Sarana:** Generate daftar alat/sarana secara otomatis berdasarkan materi (misal: Bola Basket -> Bola, Ring, Peluit, Cone).
    4. **Sintaks Pedagogis (Wajib Sesuai Pilihan):**
       - Jika *Station Learning*: Kegiatan inti HARUS berupa Pos 1, Pos 2, dst (Sirkuit).
       - Jika *Game Based*: Kegiatan inti HARUS berupa Level 1, Level 2, dst.
       - Jika *Inkuiri/Discovery*: Harus ada fase stimulasi, identifikasi masalah, dst.
       - Jika *PjBL*: Harus ada pertanyaan mendasar, desain proyek, dst.
    5. **Struktur Tabel Output:**
       Buatlah susunan tabel sebagai berikut:
       
       **Tabel 1: Identitas (HEADER)**
       Buat satu tabel khusus di paling atas dengan 2 kolom dan 4 baris:
       - Baris 1: Satuan Pendidikan | ${data.schoolName}
       - Baris 2: Mata Pelajaran | ${data.subject}
       - Baris 3: Kelas / Semester | ${data.grade} / ${data.semester}
       - Baris 4: Alokasi Waktu | ${data.meetingCount} Pertemuan x ${data.duration}

       **Tabel 2: Isi RPPM**
       Buat tabel besar di bawahnya (terpisah dari tabel identitas) dengan struktur baris judul (Heading) yang jelas untuk memisahkan setiap bagian. Gunakan **HURUF KAPITAL** dan **TEBAL** untuk judul bagian:

       A. **KARAKTERISTIK PESERTA DIDIK & PERTANYAAN PEMANTIK**
          - Buat Header Row "KARAKTERISTIK PESERTA DIDIK & PERTANYAAN PEMANTIK".
          - Isi (Gabungkan dalam satu sel besar atau bagi menjadi sub-poin yang rapi): 
            1. **Karakteristik Siswa:** Generate narasi singkat tentang karakteristik siswa di jenjang ${data.level} (fisik/motorik/psikososial) yang relevan dengan pembelajaran PJOK materi ${data.material} ini.
            2. **Pertanyaan Pemantik:** Buatlah 3-5 pertanyaan pemantik yang menarik, kontekstual, dan menantang rasa ingin tahu siswa berkaitan dengan TEMA/MATERI (${data.material}). Pertanyaan ini harus memancing siswa untuk berpikir kritis sebelum memulai aktivitas fisik.
            3. **Koneksi Pengalaman:** Tambahkan narasi deskriptif tentang bagaimana guru mengaitkan perasaan dan pengalaman siswa dari jawaban pertanyaan pemantik tersebut sebagai awal untuk memahami materi yang akan diajarkan (Apersepsi mendalam).

       B. **IDENTIFIKASI PEMBELAJARAN**
          - Buat Header Row "IDENTIFIKASI PEMBELAJARAN".
          - Isi: Materi Pokok dan Dimensi Profil Pelajar Pancasila yang dipilih (${dimensionsSummary}).

       C. **DESAIN PEMBELAJARAN**
          - Buat Header Row "DESAIN PEMBELAJARAN".
          - Isi: Capaian Pembelajaran (CP), Ide Lintas Disiplin [generate ide], Tujuan Pembelajaran (TP), Model Pembelajaran, Kemitraan [generate], Lingkungan [generate], Digital [generate tools].

       D. **PENGALAMAN BELAJAR**
          - Buat Header Row "PENGALAMAN BELAJAR".
          - Buat sub-tabel atau baris detail untuk **SETIAP PERTEMUAN**.
          - Kolom: Tahap (Memahami/Awal, Mengaplikasi/Inti, Refleksi/Penutup), Deskripsi Kegiatan (Detail langkah + Waktu + Pemanasan/Pendinginan).

       E. **ASESMEN**
          - Buat Header Row "ASESMEN".
          - Isi: Asesmen Awal, Asesmen Proses, Asesmen Akhir.

    6. **Tanda Tangan:**
       Di bagian paling bawah (luar tabel), buat area tanda tangan:
       - Kiri Bawah: Mengetahui Kepala Sekolah, Nama, NIP.
       - Kanan Bawah: Guru Mapel, Nama, NIP.

    **Gaya Bahasa:** Formal, Pendidikan Indonesia, Ejaan Yang Disempurnakan (EYD).

    **Contoh Struktur HTML (Gunakan style warna hitam explisit):**
    <div style="font-family: Arial, sans-serif; text-align: justify; color: #000000;">
      <h2 style="text-align: center; color: #000000; font-weight: bold;">RENCANA PEMBELAJARAN MENDALAM (RPPM)</h2>
      
      <!-- Tabel Identitas -->
      <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #000000; color: #000000;">
        <tr><td style="width: 30%; font-weight: bold; border: 1px solid #000000;">Satuan Pendidikan</td><td style="border: 1px solid #000000;">${data.schoolName}</td></tr>
        <tr><td style="font-weight: bold; border: 1px solid #000000;">Mata Pelajaran</td><td style="border: 1px solid #000000;">${data.subject}</td></tr>
        <tr><td style="font-weight: bold; border: 1px solid #000000;">Kelas / Semester</td><td style="border: 1px solid #000000;">${data.grade} / ${data.semester}</td></tr>
        <tr><td style="font-weight: bold; border: 1px solid #000000;">Alokasi Waktu</td><td style="border: 1px solid #000000;">...</td></tr>
      </table>

      <!-- Tabel Isi -->
      <table border="1" style="width: 100%; border-collapse: collapse; border: 1px solid #000000; color: #000000;">
         <!-- A. KARAKTERISTIK -->
         <tr style="background-color: #f0f0f0;"><th colspan="2" style="border: 1px solid #000000; padding: 10px; text-align: left; color: #000000;">I. KARAKTERISTIK PESERTA DIDIK & PERTANYAAN PEMANTIK</th></tr>
         <tr><td colspan="2" style="border: 1px solid #000000; padding: 8px;">
            <b>1. Karakteristik Peserta Didik:</b><br/>...Narasi karakteristik...<br/><br/>
            <b>2. Pertanyaan Pemantik:</b><br/>
            <ul>
              <li>...Pertanyaan 1...</li>
            </ul>
            <br/>
            <b>3. Koneksi Pengalaman & Apersepsi:</b><br/>
            ...Narasi guru mengaitkan perasaan dan pengalaman siswa...
         </td></tr>

         <!-- B. IDENTIFIKASI -->
         <tr style="background-color: #f0f0f0;"><th colspan="2" style="border: 1px solid #000000; padding: 10px; text-align: left; color: #000000;">II. IDENTIFIKASI PEMBELAJARAN</th></tr>
         <tr><td style="width: 30%; font-weight: bold; border: 1px solid #000000;">Materi Pokok</td><td style="border: 1px solid #000000;">${data.material}</td></tr>
         <!-- ... dst ... -->
      </table>
      
      <br/>
      <table style="width: 100%; border: none; color: #000000;">
        <tr>
           <td style="border: none; width: 50%; text-align: left;">
              Mengetahui,<br/>Kepala Sekolah<br/><br/><br/><br/>
              <b>${data.principalName}</b><br/>
              NIP. ${data.principalNip}
           </td>
           <td style="border: none; width: 50%; text-align: right;">
              ${data.schoolName}, [Tanggal Hari Ini]<br/>Guru Mata Pelajaran<br/><br/><br/><br/>
              <b>${data.teacherName}</b><br/>
              NIP. ${data.teacherNip}
           </td>
        </tr>
      </table>
    </div>
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        maxOutputTokens: 8000,
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "Gagal menghasilkan konten.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Terjadi kesalahan saat menghubungi AI. Pastikan API Key valid.");
  }
};