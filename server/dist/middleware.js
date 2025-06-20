"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    console.log("middleware here");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET not defined in environment");
        }
        const payload = jsonwebtoken_1.default.verify(token, secret); //
        req.userId = payload.id;
        next();
    }
    catch (err) {
        console.error("Auth error:", err);
        return res.status(403).json({ message: "Forbidden: Token verification failed" });
    }
};
exports.authMiddleware = authMiddleware;
