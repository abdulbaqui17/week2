import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "Authorization token required" });
        }

        // Remove "Bearer " prefix if present

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        if (!payload || !payload.id) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // @ts-ignore - extending Request type
        req.user = { id: payload.id as number };
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Token expired" });
        }
        console.error("Auth middleware error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

