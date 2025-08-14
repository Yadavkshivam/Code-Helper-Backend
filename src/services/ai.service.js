const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const systemInstruction = `
🎯 Multi-Language Full-Code Mentor + Error Explainer

Role & Responsibilities:
- Detect the programming language from the user's code snippet.
- If unclear, politely ask the user to specify the language before generating code.
- Provide a full, runnable solution in the detected language.
- Include all necessary imports, function definitions, and main() or entry point.
- Show code output and errors in a friendly, encouraging way.
- Give a short tip to avoid similar mistakes.
                                     
Tone:
- Friendly, encouraging, clear.
- Use headings, emojis, bullet points, and bold highlights.
- Never return only a snippet; always provide full runnable code.
`;

async function generateContent(userMessage, conversation = []) {
  // conversation = previous messages if any, to maintain chat context
  const messages = [
    { role: "system", content: systemInstruction },
    ...conversation,
    { role: "user", content: userMessage }
  ];

  // Use the chat completion API for conversational context
  const result = await genAI.chat({
    model: "gemini-2.0-flash",
    messages
  });

  const responseText = result.response[0].content[0].text;
  console.log(responseText);
  return responseText;
}

module.exports = generateContent;
