
import React from 'react';
import { ResearchAnalysis } from '../types';

interface AnalysisResultProps {
  result: ResearchAnalysis;
}

// Fix: Moved components outside of AnalysisResult and added explicit React.FC typing
// to ensure children are correctly handled by the JSX parser and typed as required.
const Card: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-3 space-x-reverse mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-800">{title}</h4>
    </div>
    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
      {children}
    </div>
  </div>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc list-inside space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="pr-1">{item}</li>
    ))}
  </ul>
);

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
      {/* 1. Objectives */}
      <Card 
        title="أهداف البحث" 
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
      >
        <List items={result.objectives} />
      </Card>

      {/* 2. Methodology */}
      <Card 
        title="المنهجية المستخدمة" 
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.641.32a2 2 0 01-1.022.547l-2.387.477a6 6 0 01-3.86-.517l-.641-.32a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.641.32z" /></svg>}
      >
        <p>{result.methodology}</p>
      </Card>

      {/* 3. Tools */}
      <Card 
        title="الأدوات المستخدمة" 
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
      >
        <List items={result.tools} />
      </Card>

      {/* 4. Sample */}
      <Card 
        title="العينة والمجتمع" 
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
      >
        <p>{result.sample}</p>
      </Card>

      {/* 5. Results */}
      <Card 
        title="أبرز النتائج" 
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2" /></svg>}
      >
        <List items={result.results} />
      </Card>

      {/* 6. Recommendations */}
      <Card 
        title="التوصيات المقترحة" 
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
      >
        <List items={result.recommendations} />
      </Card>
    </div>
  );
};

export default AnalysisResult;
