import 'dotenv/config';
import { CoreMessage } from 'ai';
import { GoogleGenAI } from "@google/genai";

// Streaming Chat 
export async function continueTextConversation(messages?: CoreMessage[]) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      throw new Error("Google Generative AI API key is missing.");
    }

    const ai = new GoogleGenAI({ apiKey});
    const latestUserMessage = messages?.filter((message) => message.role === "user").pop()?.content;

    // Transform messages into the format expected by the history
    const history = messages?.map((message) => ({
      role:  message.role === "assistant" ? "model" : message.role, // Map "assistant" to "model"
      parts: [{ text: typeof message.content === 'string' ? message.content : undefined }], // Ensure text is a string or undefined
    })) || [];

    // Create a chat instance with the transformed history
    const chat = ai.chats.create({
      model: "gemini-1.5-flash",
      history, // Pass the transformed history
    });

    // Stream a message response
    const textStream = await chat.sendMessageStream({
      message: [{ text: typeof latestUserMessage === 'string' ? latestUserMessage : "" }] ,
    });

    return textStream;
  } catch (error) {
    console.error("Error generating content:", error);
  }

}

export async function checkAIAvailability() {
  const envVarExists = !!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  return envVarExists;
}