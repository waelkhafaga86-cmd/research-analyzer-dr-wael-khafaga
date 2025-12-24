
export interface ResearchAnalysis {
  objectives: string[];
  methodology: string;
  tools: string[];
  sample: string;
  results: string[];
  recommendations: string[];
}

export type AnalysisStatus = 'idle' | 'extracting' | 'analyzing' | 'completed' | 'error';
