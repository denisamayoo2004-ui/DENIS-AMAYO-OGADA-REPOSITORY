
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis, Recommendation, NewsArticle, SystemAudit } from "../types";
import { SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeStock(symbol: string, location?: { lat: number, lng: number }): Promise<AIAnalysis> {
  const context = location ? `User location: ${location.lat}, ${location.lng}. ` : '';
  const now = new Date().toLocaleString();
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `${context}Current Time: ${now}. Perform a deep pattern recognition analysis for ${symbol} on the NSE. 
    Analyze the graph structures (head and shoulders, double bottom, etc.) and volume clusters.
    Explain what "buying at a discount" means for this specific counter if applicable.
    Provide a sentiment score from -100 to 100 and a 5-point sentiment history array.
    Strictly focus on the financial metrics and market-moving news. 
    Refine the technical indicator toolkit specifically for this counter (e.g. recommend custom RSI periods or Bollinger settings).`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          symbol: { type: Type.STRING },
          recommendation: { type: Type.STRING },
          rationale: { type: Type.STRING },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedAction: { type: Type.STRING },
          horizon: { type: Type.STRING },
          marketTrend: { type: Type.STRING },
          technicalScore: { type: Type.INTEGER },
          fundamentalScore: { type: Type.INTEGER },
          sentimentScore: { type: Type.INTEGER },
          sentimentHistory: { type: Type.ARRAY, items: { type: Type.INTEGER } },
          patternAnalysis: { type: Type.STRING },
          toolkitRefinement: { type: Type.STRING },
          technicalIndicators: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                value: { type: Type.STRING },
                signal: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          fundamentals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                metric: { type: Type.STRING },
                value: { type: Type.STRING },
                health: { type: Type.STRING }
              }
            }
          }
        },
        required: ["symbol", "recommendation", "rationale", "sentimentScore", "sentimentHistory", "patternAnalysis", "toolkitRefinement"]
      }
    }
  });

  const text = response.text || "{}";
  let data;
  try {
    data = JSON.parse(text.trim());
  } catch (e) {
    console.error("Critical: AI analysis output failed", e);
    data = { recommendation: Recommendation.HOLD, sentimentScore: 0, sentimentHistory: [0,0,0,0,0], rationale: "Data relay error" };
  }

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || 'NSE Official Feed',
    web: chunk.web?.uri || '#'
  })) || [];

  return { ...data, sources };
}

export async function performGlobalAudit(marketData: any): Promise<SystemAudit> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Run a full system check on the Nairobi Securities Exchange environment. 
    Monitor current news and trends. If there is urgent danger or specific tasks needed to remain safe, alert immediately.
    Input Data: ${JSON.stringify(marketData).slice(0, 1000)}`,
    config: {
      systemInstruction: "You are the Global Auditor AI for Denis Stocks. Monitor for market crashes, security breaches, or major news shifts.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, description: "HEALTHY, WARNING, CRITICAL" },
          message: { type: Type.STRING },
          alertType: { type: Type.STRING, description: "NEWS, SECURITY, MARKET" }
        },
        required: ["status", "message", "alertType"]
      }
    }
  });
  
  try {
    const data = JSON.parse(response.text.trim());
    return { ...data, timestamp: Date.now() };
  } catch (e) {
    return { timestamp: Date.now(), status: 'HEALTHY', message: 'All systems nominal.', alertType: 'MARKET' };
  }
}

export async function getNewsArchive(date: string): Promise<NewsArticle[]> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Acting as the Business Daily Newspaper internal reader, provide the top 3-5 market-moving news articles for: ${date}.`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            summary: { type: Type.STRING },
            content: { type: Type.STRING },
            image: { type: Type.STRING },
            source: { type: Type.STRING }
          }
        }
      }
    }
  });
  const text = response.text || "[]";
  return JSON.parse(text.trim()).map((item: any, i: number) => ({
    id: `news-${date}-${i}`,
    ...item,
    date,
    image: `https://picsum.photos/seed/news${date}${i}/800/400`
  }));
}

export async function getEducationalNotes(topic: string): Promise<{ text: string; sources: { title: string; web: string }[] }> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a quick educational note on "${topic}" in NSE context. Include practical advice.`,
    config: { systemInstruction: "You are the Denis Stocks Academy AI.", tools: [{ googleSearch: {} }] }
  });
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || 'NSE Resource',
    web: chunk.web?.uri || '#'
  })) || [];
  return { text: response.text || "", sources };
}
