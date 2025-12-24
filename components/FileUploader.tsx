
import React, { useRef } from 'react';
import { AnalysisStatus } from '../types';

interface FileUploaderProps {
  onTextExtracted: (text: string) => void;
  onStatusChange: (status: AnalysisStatus) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onTextExtracted, onStatusChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromPdf = async (file: File) => {
    onStatusChange('extracting');
    const arrayBuffer = await file.arrayBuffer();
    
    // @ts-ignore
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = "";
    // We usually need the first and last parts for most research info, but let's try to get as much as reasonable
    const numPages = Math.min(pdf.numPages, 30); // Limit to 30 pages for performance
    
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    onTextExtracted(fullText);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPdf(file);
    } else if (file) {
      alert("يرجى اختيار ملف بصيغة PDF فقط");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 bg-white rounded-3xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
      >
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h4 className="text-xl font-bold text-slate-800 mb-2">اسحب الملف هنا أو انقر للاختيار</h4>
        <p className="text-slate-500">يدعم ملفات PDF البحثية (الحد الأقصى 30 صفحة للتحليل السريع)</p>
        <input 
          type="file" 
          className="hidden" 
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;
