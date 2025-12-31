
import { GoogleGenAI, Type } from "@google/genai";
import { AgeStage, ToyCondition, UsageDuration, UsageIntensity } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIActivitySuggestions = async (stage: AgeStage, interests: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 meaningful offline activities for a child in the '${stage}' stage who is interested in: ${interests.join(', ')}. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              duration: { type: Type.STRING },
            },
            required: ["title", "description", "category", "duration"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getAIToyRecommendations = async (stage: AgeStage, availableToys: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the developmental stage '${stage}', which types of toys from this list would be best? List: ${availableToys.join(', ')}. Provide a brief reasoning for each in JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              toyName: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["toyName", "reason"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const assessToyConditionAI = async (
  toyName: string, 
  description: string, 
  duration: UsageDuration, 
  intensity: UsageIntensity, 
  imageBase64?: string
) => {
  try {
    const parts: any[] = [
      { text: `Assess the quality and suggested exchange value for a toy named "${toyName}". 
      Description: "${description}". 
      Used for: ${duration}. 
      Usage Intensity: ${intensity}.
      If an image is provided, analyze the visual condition and functional state shown. 
      Rate the condition strictly as "Excellent", "Good", or "Fair" based on these inputs. 
      Suggest a cash price in Indian Rupees (₹) and a Nest Credit value. Return JSON.` }
    ];

    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            condition: { type: Type.STRING, description: "Excellent, Good, or Fair" },
            bloomScore: { type: Type.NUMBER, description: "A score from 1-10 based on visual/text proof" },
            suggestedPrice: { type: Type.NUMBER },
            suggestedCredits: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["condition", "bloomScore", "suggestedPrice", "suggestedCredits", "reasoning"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Assessment Error:", error);
    return null;
  }
};
