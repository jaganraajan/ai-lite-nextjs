// import { createStreamableValue } from 'ai/rsc';
import 'dotenv/config';
import { CoreMessage, generateText } from 'ai';
// import { google } from "@ai-sdk/google"
import { createGoogleGenerativeAI } from '@ai-sdk/google';


// Streaming Chat 
export async function continueTextConversation(messages?: CoreMessage[]) {
  const google = createGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
  });
  
  const { text } = await generateText({
    model: google('gemini-1.5-pro-latest'),
    // messages,
    prompt: "what can AI do?"
  });

  console.log(text);
  console.log(messages);
  // const stream = result.textStream;
  // console.log(stream);
  // return stream.value;
}

export async function checkAIAvailability() {
  const envVarExists = !!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  return envVarExists;
}