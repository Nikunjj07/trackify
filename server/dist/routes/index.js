"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const checkin_1 = __importDefault(require("./checkin"));
const habit_1 = __importDefault(require("./habit"));
const mainRouter = express_1.default.Router();
mainRouter.use('/user', user_1.default);
mainRouter.use('/checkin', checkin_1.default);
mainRouter.use('/habit', habit_1.default);
exports.default = mainRouter;
