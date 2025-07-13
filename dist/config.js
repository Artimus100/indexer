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
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    heliusApiKey: process.env.HELIUS_API_KEY || '',
    webhookPort: process.env.WEBHOOK_PORT ? parseInt(process.env.WEBHOOK_PORT) : 3000,
    databaseUrl: process.env.DATABASE_URL || '',
};
const helius_sdk_1 = require("helius-sdk");
const config_1 = require("./config");
const helius = new helius_sdk_1.Helius(exports.config.heliusApiKey);
function createWebhook() {
    return __awaiter(this, void 0, void 0, function* () {
        const webhook = yield helius.createWebhook({
            accountAddresses: ['675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'],
            transactionTypes: ['ANY'],
            webhookURL: 'http://your-server.com/webhook',
            webhookType: 'raw',
        });
        console.log('Webhook created:', webhook);
    });
}
createWebhook();
