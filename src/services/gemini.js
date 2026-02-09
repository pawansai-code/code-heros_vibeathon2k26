import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
let genAI = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

// Convert file to Base64 for Gemini
const fileToGenerativePart = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const analyzeReport = async (text, file) => {
    if (!genAI) {
        console.warn("Gemini API Key missing. Using mock response.");
        return mockResponse(text);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Act as an emergency dispatcher. Analyze the input. 
      Return purely valid JSON with no markdown formatting.
      Structure: { 
        "classification": ["Fire" | "Police" | "Medical"], 
        "severity": "Low"|"Medium"|"High"|"Critical", 
        "autoMessage": string,
        "immediateActions": string (Concise, life-saving instructions. E.g. "Check breathing, apply pressure")
      }
      Analysis input: ${text || "Visual analysis required"}
    `;

        const parts = [prompt];
        if (file) {
            const filePart = await fileToGenerativePart(file);
            parts.push(filePart);
        }

        const result = await model.generateContent(parts);
        const response = await result.response;
        const textResponse = response.text();

        // Cleanup code blocks if present
        const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        // Fallback to basic keyword matching or mock if API fails
        return mockResponse(text);
    }
};

const mockResponse = (text) => {
    const isMedical = /pain|blood|hurt|breath|heart|medic/i.test(text || "");
    const isFire = /fire|smoke|burn|flame/i.test(text || "");

    return {
        classification: [isFire ? "Fire" : isMedical ? "Medical" : "Police"],
        severity: "High",
        autoMessage: "System processing. Dispatch alerted.",
        immediateActions: isMedical ? "Check for breathing. Keep person warm and calm." : "Evacuate area immediately. Do not use elevators."
    };
};
