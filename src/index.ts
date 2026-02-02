import { Client, GatewayIntentBits, Message } from "discord.js";
import { askAI, initAI, resetMemory } from "./ai.js";
import dotenv from "dotenv";

dotenv.config();

const dcToken = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(dcToken);

async function startBot() {
    try {
        console.log("initializing AI...");
        await initAI(); 
        
        console.log("🤖 Inisialisasi AI selesai, menyambung ke Discord...");
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error("❌ Bot gagal start:", error);
        process.exit(1);
    }
}

client.on("ready", () => {
  console.log(`✅ Bot is online as ${client.user?.tag}`);
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;

  // --- NEW: Reset Command ---
    if (message.content.toLowerCase() === "!reset") {
        resetMemory();
        await message.reply("Ingatanku sudah reset. Mari kita mulai debat lagi! ✨");
        return;
    }

  // Check if the bot is mentioned
  if (message.mentions.has(client.user!.id)) {
    if (message.channel.isSendable()) {
        await message.channel.sendTyping();
    }

    try {
            const cleanText = message.cleanContent;
            const aiReply = await askAI(cleanText);
            await message.reply(aiReply);
        } catch (error) {
            console.error("❌ Error di messageCreate:", error);
            await message.reply("Waduh, ada masalah teknis nih. Coba lagi ya!");
        }
  }
});

startBot();