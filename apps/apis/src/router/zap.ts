import { Router, Request } from "express";
import { authMiddleware } from "../middleware.js";
import { ZapCreateSchema } from "@repo/validators/auth";
import { prisma } from "../prisma.js";

declare global {
  namespace Express {
    interface User {
      id: string;
      // add other user properties if needed
    }
    interface Request {
      user: User;
    }
  }
}

const router = Router();


router.post("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(400).json({ error: parsedData.error });
  }
  try {
    const zap = await prisma.zap.create({
      data: {
        name: body.name,
        userId: Number(req.user.id),
        action: {
          create: body.actions.map((action: any, index: number) => ({
            sortingOrder: index,
            availableActionId: action.availableActionId,
            config: action.actionMetadata || {},
          })),
        },
      },
      include: { action: true }
    });
    const trigger = await prisma.trigger.create({
      data: {
        availableTriggerId: body.availableTriggerId,
        zapId: zap.id,
        config: body.triggerMetadata || {},
        sortingOrder: 0,
      }
    });
    await prisma.zap.update({
      where: { id: zap.id },
      data: { trigger: { connect: { id: trigger.id } } }
    });
    return res.status(201).json({ message: "Zap created successfully", zap });
  } catch (error) {
    console.error("Error creating zap:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const zaps = await prisma.zap.findMany({
      where: { userId: Number(req.user.id) },
      include: { action: true, trigger: true },
    });
    return res.status(200).json({ zaps });
  } catch (error) {
    console.error("Error fetching zaps:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:zapId", authMiddleware, async (req, res) => {
  const zapId = typeof req.params.zapId === "string" ? req.params.zapId : "";
  if (!zapId) {
    return res.status(400).json({ error: "Zap ID is required" });
  }
  try {
    const zap = await prisma.zap.findFirst({
      where: { id: zapId, userId: Number(req.user.id) },
      include: { action: true, trigger: true },
    });
    if (!zap) {
      return res.status(404).json({ error: "Zap not found" });
    }
    return res.status(200).json({ zap });
  } catch (error) {
    console.error("Error fetching zap:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;