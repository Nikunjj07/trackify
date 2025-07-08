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
exports.updateStreak = updateStreak;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const client = new client_1.PrismaClient();
function updateStreak(habitId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkins = yield client.checkIn.findMany({
            where: {
                habitId: habitId
            },
            orderBy: {
                date: 'asc'
            }
        });
        if (checkins.length === 0) {
            yield client.streak.update({
                where: {
                    habitId: habitId
                },
                data: {
                    currentStreak: 0
                }
            });
            return;
        }
        let currentStreak = 1;
        let longestStreak = 1;
        for (let i = checkins.length - 2; i >= 0; i--) {
            const today = new Date(checkins[i + 1].date);
            const prev = new Date(checkins[i].date);
            const diff = (0, date_fns_1.differenceInDays)(today, prev);
            if (diff == 1) {
                currentStreak += 1;
                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                }
            }
            else if (diff > 1) {
                break;
            }
        }
        yield client.streak.update({
            where: { habitId: habitId },
            data: {
                currentStreak: currentStreak,
                longestStreak,
                lastCheckInDate: checkins[checkins.length - 1].date,
            },
        });
    });
}
