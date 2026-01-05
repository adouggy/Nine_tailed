
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { DesignStyle, DesignBlueprint } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateDesignBlueprint = async (style: DesignStyle): Promise<DesignBlueprint> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = style === DesignStyle.BEAUTY 
    ? "设计一款橄榄核雕方案，题材为《山海经》九尾天狐。风格：‘美女九尾’。重点在于展示天狐化身美女的优雅、仙气，结合传统汉唐服饰与九条如丝绸般飘动的尾巴。需要详细描述构图、层次感和雕刻难点。"
    : "设计一款橄榄核雕方案，题材为《山海经》九尾天狐。风格：‘狐妖九尾’。重点在于展示天狐的神性与妖气，威严且灵动，体现远古神兽的压迫感，注重毛发纹理与流云走势。需要详细描述构图、立体感和微雕细节。";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          elements: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          carvingTechniques: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          philosophy: { type: Type.STRING }
        },
        required: ["title", "description", "elements", "carvingTechniques", "philosophy"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateDesignImage = async (style: DesignStyle): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = style === DesignStyle.BEAUTY
    ? "A conceptual sketch for Chinese Olive Pit Carving (Hedaio). Subject: A beautiful ancient Chinese celestial maiden representing the Nine-Tailed Fox from Classic of Mountains and Seas. She has nine elegant, flowing silk-like tails. Intricate Tang-style robes, holding a luminous pearl. Detailed high-relief carving style, wooden texture of an olive pit, macro photography, traditional Chinese art aesthetic."
    : "A conceptual sketch for Chinese Olive Pit Carving (Hedaio). Subject: A powerful and mystical Nine-Tailed Fox from Classic of Mountains and Seas. Fierce but divine posture, nine dynamic and massive tails swirling like clouds. Intricate fur textures, sharp claws, standing on a miniature mountain peak. High-relief and hollowed carving style, dark olive pit wood texture, dramatic lighting, mythical beast atmosphere.";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  let imageUrl = "";
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }
  
  if (!imageUrl) throw new Error("Failed to generate image");
  return imageUrl;
};
