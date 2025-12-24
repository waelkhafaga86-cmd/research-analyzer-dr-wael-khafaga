
import { GoogleGenAI, Type } from "@google/genai";
import { ResearchAnalysis } from "../types";

export const analyzeResearchText = async (text: string): Promise<ResearchAnalysis> => {
  // للتشغيل المحلي، تأكد من وجود متغير بيئة باسم API_KEY
  const apiKey = process.env.API_KEY || (import.meta as any).env.VITE_API_KEY;
  
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const sourceText = text.slice(0, 20000);

  const prompt = `
    حلل النص التالي المستخرج من ورقة بحثية أكاديمية واستخرج المعلومات المحددة بدقة باللغة العربية.
    إذا لم تجد معلومة محددة، اكتب "غير مذكور بوضوح".
    
    النص:
    ${sourceText}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "أنت مساعد بحث أكاديمي خبير. وظيفتك هي قراءة الأبحاث واستخراج الأهداف والمنهجية والأدوات والعينة والنتائج والتوصيات بدقة عالية وباللغة العربية الفصحى. يجب أن يكون الرد بتنسيق JSON حصراً.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          objectives: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "قائمة بأهداف الدراسة"
          },
          methodology: {
            type: Type.STRING,
            description: "المنهجية العلمية المستخدمة في البحث"
          },
          tools: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "الأدوات العلمية المستخدمة (مثل الاستبيانات، الاختبارات...)"
          },
          sample: {
            type: Type.STRING,
            description: "وصف لعينة البحث ومجتمع الدراسة"
          },
          results: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "قائمة بأهم نتائج البحث"
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "قائمة بالتوصيات المقترحة"
          }
        },
        required: ["objectives", "methodology", "tools", "sample", "results", "recommendations"]
      }
    }
  });

  try {
    const analysis = JSON.parse(response.text || '{}');
    return analysis as ResearchAnalysis;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("حدث خطأ أثناء معالجة البيانات من الذكاء الاصطناعي.");
  }
};
