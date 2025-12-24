
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    });

    window.addEventListener('appinstalled', () => {
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-200">
            أ
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">محلل الأبحاث الأكاديمية</h1>
            <p className="text-xs text-slate-500 font-medium">بإشراف د / وائل خفاجه</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {showInstallBtn && (
            <button 
              onClick={handleInstall}
              className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-md shadow-green-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              تثبيت كبرنامج
            </button>
          )}
          <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
            Dr. Wael Khafaga
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
