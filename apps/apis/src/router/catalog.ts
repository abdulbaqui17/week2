import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

router.get("/available-triggers", async (req, res) => {
  try {
    const triggers = await prisma.availableTrigger.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(triggers);
  } catch (error) {
    console.error("Error fetching triggers:", error);
    res.status(500).json({ error: "Failed to fetch triggers", details: error instanceof Error ? error.message : String(error) });
  }
});

router.get("/available-actions", async (req, res) => {
  try {
    const actions = await prisma.availableAction.findMany({
      where: { NOT: { name: { in: ['http_request','db_write'] } } },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    res.json(actions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch actions" });
  }
});

export default router;