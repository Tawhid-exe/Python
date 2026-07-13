import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Natural Gemini 3.5 Flash — no system overrides
export const model = genAI.getGenerativeModel({
  model: 'gemini-3.1-flash-lite',
});

export async function* sendMessageStreamToGemini(
  history: any[],
  message: string,
  _contextData?: { currentModuleTitle?: string; progressPercent?: number }
) {
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Please add your actual VITE_GEMINI_API_KEY to the .env file!');
  }

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
  });

  const result = await chat.sendMessageStream(message);
  for await (const chunk of result.stream) {
    yield chunk.text();
  }
}
