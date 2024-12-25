import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Context } from "hono";

// ✅ Initialize the API client and model once to avoid repeated creation
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getGeminiRes = async (c: Context) => {
  try {
    // ✅ Extract the request body
    const body = await c.req.json();
    console.log(body.animes.join(", "));

    // ✅ Validate input data
    if (!body.animes || !Array.isArray(body.animes)) {
      return c.json(
        { success: false, message: "Invalid or missing 'animes' data" },
        400
      );
    }

    // ✅ Build a dynamic prompt based on user-provided animes
    const prompt = `
    You are an AI assistant who is very good at recommending anime to users.Your task is to provide the top 10 animes the user can watch next based on the animes they have watched in the past.Your name is HeavenAI
      Based on these animes: ${JSON.stringify(body.animes)}, recommend the top 10 animes the user can watch next. 
      The response should include a valid JSON object with:
      - 'animes': an array of objects, where each object contains 'name', 'MAL_id', 'MAL_link' and 'MAL_popularity': you have to scrape it from MyAnimeList website's stats.
      - 'extra': additional comments, if any (keep it as short as possible. write all the information  in one sentence).
    `;

    // ✅ Generate content using the AI model
    const result = await model.generateContent(prompt);
    const ans = result.response.text();
    console.log(ans);

    // ✅ Safe parsing of JSON response
    let parsedResponse;
    try {
      // Extract JSON safely using regex
      parsedResponse = JSON.parse(
        ans.match(/```json([\s\S]*?)```/)?.[1] || ans
      );
    } catch (parseErr) {
      throw new Error("Failed to parse the AI response");
    }

    console.log("Parsed Response:", parsedResponse);

    // ✅ Return the response
    return c.json({ success: true, data: parsedResponse });
  } catch (err: any) {
    console.error("Error in getGeminiRes:", err.message || err);
    return c.json(
      { success: false, message: err.message || "Something went wrong" },
      500
    );
  }
};

export default getGeminiRes;
