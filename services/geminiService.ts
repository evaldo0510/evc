
import { GoogleGenAI, Type } from "@google/genai";

export const getGeminiResponse = async (userMessage: string, history: {role: string, content: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    Você é o assistente virtual de Evaldo Poeta. Evaldo é Poeta Terapêutico, Psicanalista Clínico e criador do método Poesia Cognitiva Hipnótica (PCH).
    
    Sua missão é:
    1. Atender interessados no método PCH e em sessões de psicanálise.
    2. Explicar que Evaldo transforma dor em linguagem e poesia em caminho de liberdade.
    3. Ser poético, profundo, empático e sofisticado.
    4. Encaminhar agendamentos para o WhatsApp: 11 96122-6754.
    
    Lema: "Palavras que libertam. Consciência que desperta."
    
    Dê respostas curtas, como se fossem versos ou insights psicanalíticos. Se o usuário estiver em sofrimento, acolha com uma frase poética e sugira o contato profissional.
  `;

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    }
  });

  const response = await chat.sendMessage({ message: userMessage });
  return response.text;
};

export const getNearbyClinicalSpaces = async (lat: number, lng: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Liste 4 ou 5 centros culturais, livrarias ou espaços de bem-estar psicológico e meditação perto das coordenadas ${lat}, ${lng} no Brasil. Seja elegante na descrição.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    }
  });

  const text = response.text;
  const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return { text, links };
};
