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
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRouter = (0, express_1.Router)();
const client = new client_1.PrismaClient();
const signupSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const secret = process.env.JWT_SECRET || "";
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        res.json({
            message: "Incorrect Inputs!"
        });
    }
    const findUser = yield client.user.findFirst({
        where: {
            email: body.email
        }
    });
    if (findUser) {
        res.json({
            message: "Email already taken / Incorrect inputs"
        });
        return;
    }
    //hashing pass
    const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
    try {
        const user = yield client.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            }
        });
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, secret); //check format
        console.log(token);
        // add cookie or jwt
        res.cookie("token", token);
        res.json({
            message: "User created successfully!"
        });
    }
    catch (e) {
        console.log(e);
    }
}));
const signinSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const secret = process.env.JWT_SECRET || "";
    const parsed = signinSchema.safeParse(body);
    if (!parsed) {
        res.status(411).json({
            message: "incorrect inputs!"
        });
        return;
    }
    const user = yield client.user.findUnique({
        where: {
            email: body.email
        }
    });
    if (!user) {
        res.json({
            message: "user not found!"
        });
        return;
    }
    const isMatch = bcrypt_1.default.compareSync(body.password, user.password);
    if (!isMatch) {
        res.json({
            message: "Incorrect Password!"
        });
        return;
    }
    const token = (0, jsonwebtoken_1.sign)({ id: user.id }, secret);
    res.cookie("token", token);
    res.json({
        message: "User Signed In!"
    });
}));
userRouter.post("/signout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/landing"); //confirm later on
});
exports.default = userRouter;
