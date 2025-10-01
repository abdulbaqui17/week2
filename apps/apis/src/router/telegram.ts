import { Router } from "express";
import { prisma } from "../prisma.js";
import { Kafka, Partitioners, Producer } from "kafkajs";
import { z } from "zod";
import crypto from "crypto";

const router = Router();
const ZAP_TRIGGER_TOPIC = process.env.ZAP_TRIGGER_TOPIC || "zap.trigger";

const ENCRYPTION_KEY_B64 = process.env.ENCRYPTION_KEY || ""; // base64 32 bytes
const ENC_KEY = ENCRYPTION_KEY_B64 ? Buffer.from(ENCRYPTION_KEY_B64, "base64") : Buffer.alloc(32);

function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", ENC_KEY, iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64");
}

function getUserIdFromReq(req: any): number | null {
  const hdr = req.headers["authorization"] as string | undefined;
  const m = hdr ? /^Bearer (\d+)$/.exec(hdr) : null;
  return m ? Number(m[1]) : null;
}

let producer: Producer | null = null;
async function getProducer(): Promise<Producer> {
  if (producer) return producer;
  const kafka = new Kafka({
    clientId: "apis-telegram",
    brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
  });
  producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
  await producer.connect();
  return producer;
}

const botSchema = z.object({ name: z.string().min(1), token: z.string().min(10) });

router.post("/telegram/register", async (req, res) => {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: "unauthorized" });
  if (!ENCRYPTION_KEY_B64) return res.status(500).json({ error: "server_not_configured_for_encryption" });
  const parsed = botSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_bot", details: parsed.error.flatten() });
  // @ts-ignore - generated Prisma types will include TelegramBot after migration
  const bot = await prisma.telegramBot.create({ data: { name: parsed.data.name, tokenEnc: encrypt(parsed.data.token), userId } });
  return res.json({ id: bot.id, name: bot.name, createdAt: bot.createdAt });
});

// Public webhook invoked by Telegram
router.post("/telegram/webhook/:triggerId", async (req, res) => {
  const { triggerId } = req.params;
  // @ts-ignore - generated Prisma types will include relations after migration
  const trigger = await prisma.trigger.findUnique({ where: { id: triggerId }, include: { zap: true, telegramBot: true } });
  // @ts-ignore - relation typing after migration
  if (!trigger || !trigger.zap) return res.status(404).json({ error: "trigger_not_found" });
  const update = req.body;
  const p = await getProducer();
  await p.send({
    topic: ZAP_TRIGGER_TOPIC,
    messages: [{ key: trigger.zapId, value: JSON.stringify({ trigger: "telegram", zapId: trigger.zapId, payload: update }) }],
  });
  return res.json({ ok: true });
});

export default router;
