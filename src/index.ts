import { Client, GatewayIntentBits, Message } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_TOKEN);

const responses = [
  "bacot",
  "minimal top up lah",
  "f2p banyak gaya",
  "bukan mainland minggir dulu",
  "minta diinjek dromas ni orang",
  "w masukin shackling prison lu ye",
  "noted",
  "dilarang winnie the pooh",
  "kena tariff bro",
];

const cooldownMemory = new Set();
const COOLDOWN_LIMIT = 3;

function getRandomResponse() {
  const available = responses.filter((r) => !cooldownMemory.has(r));

  if (available.length === 0) {
    cooldownMemory.clear();
    available.push(...responses);
  }

  const response = available[Math.floor(Math.random() * available.length)];

  cooldownMemory.add(response);

  if (cooldownMemory.size > COOLDOWN_LIMIT) {
    const first = cooldownMemory.values().next().value;
    cooldownMemory.delete(first);
  }

  return response;
}

client.on("ready", () => {
  console.log(`✅ Bot is online as ${client.user?.tag}`);

  client.user?.setPresence({
    activities: [{ name: "Honking: Star Rail (REAL)", type: 0 }], // 0 = PLAYING
    status: "online",
  });
});

client.on("messageCreate", async (message: Message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Check if the bot is mentioned
  if (message.mentions.has(client.user!.id)) {
    const response = getRandomResponse();
    await message.reply(response);
  }
});
