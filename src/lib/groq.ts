import Groq from 'groq-sdk';

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

export const groq = new Groq({
  apiKey: groqApiKey,
  dangerouslyAllowBrowser: true, // Note: In production, it's safer to proxy this through a backend
});
