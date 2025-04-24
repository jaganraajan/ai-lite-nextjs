import 'dotenv/config';
import { CoreMessage, streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';


// Streaming Chat 
export async function continueTextConversation(messages?: CoreMessage[]) {
  const google = createGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
  });
  
  const { textStream } = await streamText({
    model: google('gemini-1.5-pro-latest'),
    messages
  });

  return textStream;
}

export async function checkAIAvailability() {
  const envVarExists = !!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  return envVarExists;
}