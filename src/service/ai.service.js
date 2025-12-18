const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
async function generateResponse(userPrompt) {
  console.log("Sending prompt to AI:", userPrompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
       contents: chatHistory,
       //[
      //   { role: "user", parts: [{ text: userPrompt }] }
      // ]
      

      config: {
        systemInstruction: `
          You are a friendly chatbot.
          Answer politely and clearly.
          Keep responses short.
        `
      }
    });

    const reply = response.candidates?.[0]?.content?.parts?.[0]?.text;

    // Only log the reply
    console.log("AI reply:", reply);

    return reply || "Sorry, AI did not respond.";
  } catch (err) {
    console.error("AI call error:", err);
    return "AI is busy. Please try again later.";
  }
}



module.exports = { generateResponse };
