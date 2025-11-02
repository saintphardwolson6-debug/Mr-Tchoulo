import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import { settings } from "./settings.js";
import config from "./config.js";
import fs from "fs";

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const sock = makeWASocket({ auth: state });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (msg) => {
    const m = msg.messages[0];
    if (!m.message) return;
    const text = m.message.conversation || m.message.extendedTextMessage?.text;

    if (text?.startsWith(config.prefix)) {
      const command = text.slice(1).trim().split(" ")[0].toLowerCase();

      if (command === "menu") {
        await sock.sendMessage(m.key.remoteJid, {
          text: `🎧 *${config.botName}*\n🧠 Intelligence artificielle active\n📞 *By ${config.ownerName}*\n\nCommandes disponibles :\n.menu\n.groupe\n.prive\n.ai\n.support\n.owner`,
        });
      }

      if (command === "support") {
        await sock.sendMessage(m.key.remoteJid, {
          text: `📞 *Support officiel*\n👑 Owner : ${config.ownerName}\n📱 WhatsApp : wa.me/${config.ownerNumber}\n🔗 Canal : ${config.channelLink}\n\nMerci d’utiliser *${config.botName}* 🙌\n_By Mr Tchoulo_`,
        });
      }
    }
  });
};

startBot();