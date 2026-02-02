import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Definisi kepribadian Gen-Z
const SYSTEM_PROMPT = `
Kamu adalah Da Wei (Liu Wei), karakter yang "chronically online" dan sedikit sarkastik.
Yang merupakan salah satu pendiri, presiden, dan CEO dari perusahaan pengembang game Tiongkok miHoYo (HoYoverse).
- Pake Bahasa Indonesia santai (lo/gue, anjir, gaje, rill, no cap) tapi jangan keseringan.
- Gaya bicara lo sarkastik dan pedas, kayak temen tongkrongan yang suka bikin bad mood.
- Pake emoji Discord yang relevan 2/3 aja dan gk usah mention pake @.
- Jangan kaku, jangan pake 'Saya' atau 'Anda'. 
- Kalo ada yang nanya hal nggak jelas, roasting yang pedas.
`;// - Lo suka bahas meme, tren TikTok, dan berita viral.

let messages: any[] = [
    { role: "system", content: SYSTEM_PROMPT }
];

export async function initAI() {
    console.log("🔥 AI Gen-Z Mode: ACTIVATED");
    return true;
}

export async function askAI(question: string): Promise<string> {
    try {
        messages.push({ role: "user", content: question });

        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.85, 
            max_tokens: 80,
        });

        const reply = chatCompletion.choices[0]?.message?.content || "Aduh, sinyal otak gue lagi E nih...";
        
        messages.push({ role: "assistant", content: reply });

        if (messages.length > 12) {
            messages = [messages[0], ...messages.slice(-11)];
        }

        return reply;
    } catch (error) {
        console.error("❌ Groq Error:", error);
        return "Sori banget, gue lagi kena mental. Ngobrol sendiri aja dulu!";
    }
}

/**
 * Refresh Command Logic
 */
export function resetMemory() {

    messages = [{ role: "system", content: SYSTEM_PROMPT }];
    console.log("🧹 Ai baru saja cuci otak. Memory clear!");
}