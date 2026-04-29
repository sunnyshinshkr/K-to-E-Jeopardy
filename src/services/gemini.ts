import { GoogleGenAI } from "@google/genai";
import { Category, FinalJeopardy } from "../types";

export interface GameBoard {
  categories: Category[];
  finalJeopardy: FinalJeopardy;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateGameBoard(topic: string = "general topics"): Promise<GameBoard> {
  const PROMPT = `
Generate a Jeopardy-style game board for Korean-to-English translation practice.
The audience is students or people wanting to learn natural, spoken, and idiomatic English.

Specific Topic: ${topic}

Requirements:
1. Return exactly 5 categories related to the theme.
2. Each category must have 5 questions with points 100, 200, 300, 400, 500.
3. Points should correlate with difficulty (shorter/simpler for 100, more complex/idiomatic for 500).
4. The questions must be in Korean (natural spoken style).
5. The answers must be the translation in natural, contemporary English (not textbook style).
6. Also generate 1 "Final Jeopardy" question which is the most challenging and meaningful translation phrase related to the theme.
7. Format the response as a valid JSON object matching this structure:
{
  "categories": [
    {
      "id": "string",
      "title": "string",
      "questions": [
        { "id": "string", "points": number, "question": "string", "answer": "string" }
      ]
    }
  ],
  "finalJeopardy": {
    "category": "string",
    "question": "string",
    "answer": "string"
  }
}

Only return the JSON. No markdown formatting.
`;

  try {
    const response = await ai.models.generateContent({ 
      model: "gemini-3-flash-preview",
      contents: PROMPT,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    
    // Transform to internal Category type (ensure isUsed: false)
    const categories = data.categories.map((cat: any, cIdx: number) => ({
      ...cat,
      id: `cat-${cIdx}`,
      questions: cat.questions.map((q: any, qIdx: number) => ({
        ...q,
        id: `q-${cIdx}-${qIdx}`,
        category: cat.title,
        isUsed: false
      }))
    }));

    return {
      categories,
      finalJeopardy: data.finalJeopardy
    };
  } catch (error) {
    console.error("Error generating game board:", error);
    throw error;
  }
}
