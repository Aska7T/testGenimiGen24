import { GoogleGenAI } from "@google/genai";
import { SolarTerm } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Generate a specific daily poem or proverb based on term and weather
export const generateDailyPoem = async (term: SolarTerm, weather: string, location: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a very short, beautiful Chinese couplet or poem (max 20 words) for the solar term ${term.name}. 
      Context: Weather is ${weather}, Location is ${location}. 
      Style: Classical Chinese poetry, elegant, profound.
      Output: Just the poem text, nothing else.`
    });
    return response.text.trim();
  } catch (error) {
    console.error("GenAI Error:", error);
    return term.poem; // Fallback to static poem
  }
};

// Generate a quiz question
export const generateQuiz = async (term: SolarTerm): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Create a multiple choice question about the Solar Term ${term.name} (${term.pinyin}).
            It should test knowledge about its climate, customs, or three pentads (三候).
            
            Return ONLY a raw JSON object (no markdown code blocks) with this shape:
            {
              "question": "string",
              "options": ["string", "string", "string", "string"],
              "correctIndex": number (0-3),
              "explanation": "string"
            }`
        });
        const text = response.text.replace(/```json|```/g, '').trim();
        return text;
    } catch (error) {
        console.error("GenAI Quiz Error", error);
        return "";
    }
}

// Generate health advice
export const generateHealthTip = async (term: SolarTerm): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Give 3 very short, bulleted health tips for the solar term ${term.name} based on Traditional Chinese Medicine (TCM). Focus on diet and sleep. Total length under 100 words.`
        });
        return response.text;
    } catch (e) {
        return "早睡早起，调养身心。";
    }
}