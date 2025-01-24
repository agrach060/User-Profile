import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { movie } = body;

        if (!movie) {
            return NextResponse.json({ error: "Movie name is required" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Tell me an interesting fact about the movie "${movie}".`;

        const result = await model.generateContent(prompt);

        const fact = result.response.text();

        return NextResponse.json({ fact });
    } catch (error) {
        console.error("Error fetching movie fact:", error);
        return NextResponse.json({ error: "Failed to fetch movie fact" }, { status: 500 });
    }
}
