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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const streakService_1 = require("../services/streakService");
const middleware_1 = require("../middleware");
const checkInRouter = (0, express_1.Router)();
const client = new client_1.PrismaClient();
checkInRouter.use(middleware_1.authMiddleware);
checkInRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitId = Number(req.body.habitId);
    console.log(habitId);
    const userId = req.userId;
    if (!habitId) {
        res.status(401).json({
            message: "User or Habit not found!"
        });
        return;
    }
    try {
        const date = new Date();
        const existing = yield client.checkIn.findFirst({
            where: {
                habitId: habitId,
                date: date.toISOString()
            }
        });
        console.log("here");
        if (existing) {
            res.json({
                message: "checkIn already exists!"
            });
            return;
        }
        const checkIn = yield client.checkIn.create({
            data: {
                habitId: habitId,
                date: date.toISOString()
            }
        });
        yield (0, streakService_1.updateStreak)(habitId);
        res.json({
            checkIn: checkIn
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.json({ message: "Server error" });
    }
}));
checkInRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitId = Number(req.params.id);
    try {
        const checkIns = yield client.checkIn.findMany({
            where: {
                habitId: Number(habitId)
            },
            orderBy: {
                date: "asc"
            }
        });
        res.json({
            checkIns
        });
    }
    catch (e) {
        console.error;
    }
}));
exports.default = checkInRouter;
