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
    streakGoal: zod_1.default.number()
});
habitRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userId = req.userId;
    console.log("check user", body); ////
    const { success } = habitSchema.safeParse(body);
    if (!success) {
        res.json({
            message: "Invalid Inputs!"
        });
        return;
    }
    try {
        const habit = yield client.habit.create({
            data: {
                name: body.name,
                userId: userId,
                description: body.description,
                goalStreak: body.streakGoal
            }
        });
        res.json({
            message: "added habit!"
        });
    }
    catch (e) {
        console.error();
        return;
    }
    return;
}));
const updateHabitSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    goalStreak: zod_1.default.number().optional(),
    reminder: zod_1.default.boolean().optional(),
});
habitRouter.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitId = req.params.id;
    const body = req.body;
    const userId = req.userId;
    const { success } = updateHabitSchema.safeParse(body);
    if (!success) {
        res.json({
            message: "Invalid Inputs!"
        });
        return;
    }
    try {
        const currentHabit = client.habit.findUnique({
            where: {
                id: Number(habitId)
            }
        });
        if (!currentHabit) {
            res.json({
                message: "Habit not found"
            });
            return;
        }
        const updatedHabit = yield client.habit.update({
            where: { id: Number(habitId) },
            data: body,
        });
        res.json({
            message: "habit updated successfully!",
            habit: updatedHabit
        });
    }
    catch (e) {
        console.error;
    }
}));
habitRouter.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitId = req.params.id;
    try {
        const habit = yield client.habit.findUnique({
            where: {
                id: Number(habitId)
            }
        });
        if (!habit) {
            res.json({
                message: "invalid habit id"
            });
            return;
        }
        const deleted = yield client.habit.delete({
            where: {
                id: Number(habitId)
            }
        });
        res.json({
            message: "habit deleted!"
        });
        return;
    }
    catch (e) {
        console.error;
    }
}));
habitRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }
    try {
        const habits = yield client.habit.findMany({
            where: {
                userId: userId
            }
        });
        console.log(habits);
        res.json(habits);
    }
    catch (e) {
        console.error;
    }
}));
habitRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const habitId = req.params.id;
    if (!userId) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }
    try {
        const habit = yield client.habit.findFirst({
            where: {
                id: Number(habitId)
            },
            include: {
                streak: true
            }
        });
        res.json(habit);
    }
    catch (e) {
        console.error;
    }
}));
exports.default = habitRouter;
