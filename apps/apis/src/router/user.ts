import { Router } from "express";
import { authMiddleware } from "../middleware.js";
import { signupSchema, signinSchema } from "@repo/validators/auth";
import { prisma } from "../prisma.js";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = signupSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
    }
    // Check if user already exists
    const user = await prisma.user.findFirst({
        where: { email: parsedData.data.email }
    });
    if (user) {
        return res.status(400).json({ error: "User already exists" });
    }
    const newUser = await prisma.user.create({
        data: parsedData.data
    });
    return res.status(201).json({ message: "User created successfully", data: newUser})
    
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = signinSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error });
    }
    const user = await prisma.user.findFirst({
        where: {
            email: parsedData.data.email,
            password: parsedData.data.password
        }
    });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    const token =jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    return res.status(200).json({ message: "Signin successful", data: { token } });
});

router.get("/user", authMiddleware, async (req, res) => {
        const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { name: true, email: true } });
        return res.status(200).json({ ok: true, user });

});

export default router;
