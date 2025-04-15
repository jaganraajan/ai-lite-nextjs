export async function checkAIAvailability() {
    const envVarExists = !!process.env.GEMINI_API_KEY;
    return envVarExists;
  }