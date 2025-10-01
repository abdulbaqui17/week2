import { PrismaClient } from '../../db/generated/prisma/index.js';
const prisma = new PrismaClient();
import { sendEmail } from './actions/sendEmail.js';

// removed http_request mapping - 30 September 2025
// Map AvailableAction.name -> implementation
const actionImpl: Record<string, (cfg: any, input: any) => Promise<any>> = {
  send_email: sendEmail,
};

export async function executeZapRun(zapRunId: string) {
  const run = await prisma.zapRun.findUnique({
    where: { id: zapRunId },
    include: {
      zap: {
        include: {
          trigger: { include: { type: true } },
          action: { include: { type: true } },
        },
      },
    },
  });
  if (!run) throw new Error("zapRun not found");
  if (!run.zap) throw new Error("zap missing");

  let payload: any = run.metaData ?? {};
  for (const a of run.zap.action) {
    const name = a.type.name;
    const impl = actionImpl[name];
    if (!impl) {
      console.error("executeZapRun: missing implementation for action", name);
      return { error: "action_not_found", name };
    }
    // @ts-ignore: you'll add Action.config later if desired
    const cfg = (a as any).config ?? {};
    const result = await impl(cfg, payload);
    payload = { prev: payload, action: result };
  }
  return payload;
}
