
import { GoogleGenAI } from "@google/genai";

export async function getBeautyAdvice(userQuery: string, imageBase64?: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const parts: any[] = [{ text: userQuery }];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64
        }
      });
    }

    // Switched to gemini-3-flash-preview for faster response times on mobile devices
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: `You are the Lead Beauty Expert at 'Lofty Beauty' in Colombo, Sri Lanka. 
        Your persona is: Helpful, Professional, Friendly, and Easy to understand.
        
        Style Rules:
        1. Use simple, clear, and modern language. Avoid complex medical jargon.
        2. Treat every customer with kindness and respect.
        3. If an image is provided, provide a high-level aesthetic observation of their skin needs.
        4. Always recommend specifically named Lofty Beauty services and mention prices in LKR: 
           - Clear Skin Facial (for cleaning/congestion)
           - Deep Hydration Treatment (for dryness/dehydration)
           - Luxury Gold Facial (for aging/premium results)
           - Signature Haircut (for style changes)
           - Full Wedding Package (for upcoming events)
        5. Close every response with a friendly sign-off like 'We hope to see you soon at our Colombo sanctuary' or 'Warmly, the Lofty Team'.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Finalization Error:", error);
    return "I apologize, our digital concierge is temporarily resting. Please contact our Colombo salon directly for immediate assistance.";
  }
}
