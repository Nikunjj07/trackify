import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Extend Request type to include userId
declare module "express" {
  interface Request {
    userId?: string;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
        
    const token = req.cookies?.token;
    console.log("middleware here")

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET not defined in environment");
        }

        const payload = jwt.verify(token, secret) as { id: string }; //
        req.userId = payload.id;

        next();
    } catch (err) {
        console.error("Auth error:", err);
        return res.status(403).json({ message: "Forbidden: Token verification failed" });
    }
};
