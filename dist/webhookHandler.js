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
exports.handleWebhook = exports.prisma = void 0;
const prisma_1 = require("../generated/prisma");
exports.prisma = new prisma_1.PrismaClient();
const handleWebhook = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const transaction = {
        signature: event.signature,
        timestamp: new Date(),
    };
    const logs = ((_b = (_a = event.transaction) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.logMessages) || [];
    const accountKeys = ((_e = (_d = (_c = event.transaction) === null || _c === void 0 ? void 0 : _c.transaction) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.accountKeys.map(ak => ak.pubkey)) || [];
    if (logs.some(log => log.includes('initialize2: InitializeInstruction2'))) {
        transaction.ammId = accountKeys[2];
        yield exports.prisma.transaction.create({
            data: {
                signature: transaction.signature,
                ammId: transaction.ammId,
                timestamp: transaction.timestamp,
            },
        });
        console.log(`New Raydium pool: ${transaction.signature}`);
    }
});
exports.handleWebhook = handleWebhook;
