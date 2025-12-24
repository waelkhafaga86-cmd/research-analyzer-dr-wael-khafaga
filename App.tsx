
import React, { useState, useCallback } from 'react';
import { ResearchAnalysis, AnalysisStatus } from './types';
import { analyzeResearchText } from './services/geminiService';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import AnalysisResult from './components/AnalysisResult';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [result, setResult] = useState<ResearchAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (text: string) => {
    setStatus('analyzing');
    setError(null);
    try {
      const analysis = await analyzeResearchText(text);
      setResult(analysis);
      setStatus('completed');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'حدث خطأ غير متوقع');
      setStatus('error');
    }
  }, []);

  const reset = () => {
    setStatus('idle');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-10">
      <Header />
      
      <main className="w-full max-w-5xl px-4 mt-8 space-y-8 flex-grow">
        {status === 'idle' && (
          <div className="text-center space-y-6 animate-fadeIn">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-2">
              منصة متطورة لطلاب الدراسات العليا
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">مساعدك الذكي في تحليل الأبحاث</h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-lg">
              ارفع ملف الـ PDF الخاص بالبحث، وسيقوم نظامنا المدعوم بالذكاء الاصطناعي باستخراج العناصر الجوهرية لك في ثوانٍ معدودة.
            </p>
            <FileUploader 
              onTextExtracted={handleFileUpload} 
              onStatusChange={setStatus} 
            />
          </div>
        )}

        {(status === 'extracting' || status === 'analyzing') && (
          <div className="flex flex-col items-center justify-center p-20 space-y-6 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-slate-700">
                {status === 'extracting' ? 'جاري استخراج النص من الملف...' : 'جاري تحليل البحث بالذكاء الاصطناعي...'}
              </p>
              <p className="text-sm text-slate-500 mt-2">نستخدم تقنيات متقدمة لضمان دقة الاستخراج</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              onClick={reset}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-xl transition font-bold shadow-lg shadow-red-200"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {status === 'completed' && result && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-800">نتائج التحليل الأكاديمي</h3>
                <p className="text-sm text-slate-500">تم استخراج البيانات بناءً على هيكلية البحث العلمي</p>
              </div>
              <button 
                onClick={reset}
                className="w-full md:w-auto text-blue-600 hover:text-blue-700 font-bold px-6 py-2.5 border-2 border-blue-100 rounded-xl hover:bg-blue-50 transition"
              >
                تحليل بحث آخر
              </button>
            </div>
            <AnalysisResult result={result} />
          </div>
        )}
      </main>

      <footer className="w-full mt-auto py-8 text-center bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-slate-500 text-sm font-medium">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} 
            <span className="text-blue-600 font-bold mr-1">د / وائل خفاجه</span>
          </p>
          <p className="text-slate-400 text-xs mt-1">تطوير مخصص لدعم البحث العلمي والباحثين</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
