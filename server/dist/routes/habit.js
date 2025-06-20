"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const middleware_1 = require("../middleware");
const habitRouter = (0, express_1.Router)();
const client = new client_1.PrismaClient();
habitRouter.use(middleware_1.authMiddleware);
const habitSchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    goalStreak: zod_1.default.number(),
    reminder: zod_1.default.boolean()
});
habitRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userId = req.userId;
    const success = habitSchema.safeParse(body);
    if (!success) {
        res.json({
            message: "Invalid Inputs!"
        });
        return;
    }
    try {
        const habit = client.habit.create({
            data: {
                name: body.name,
                userId: userId,
                description: body.description,
                goalStreak: body.goalStreak,
                reminder: body.reminder
            }
        });
    }
    catch (e) {
        console.error;
    }
}));
exports.default = habitRouter;
