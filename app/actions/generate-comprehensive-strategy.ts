import OpenAI from "openai"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function generateComprehensiveStrategy(prompt: string) {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables.")
  }

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })

    return completion.choices[0].message?.content || "No response from OpenAI."
  } catch (error) {
    console.error("Error generating comprehensive strategy:", error)
    return `Error generating comprehensive strategy: ${error}`
  }
}
