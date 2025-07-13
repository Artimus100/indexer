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
const helius_sdk_1 = require("helius-sdk");
const config_1 = require("./config");
function createWebhook() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const helius = new helius_sdk_1.Helius(config_1.config.heliusApiKey);
            const webhook = yield helius.createWebhook({
                webhookURL: 'http://your-server.com/webhook', // Replace with your public URL (e.g., ngrok)
                transactionTypes: [helius_sdk_1.TransactionType.TRANSFER], // Use the TransactionType enum value
                accountAddresses: ['675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'], // Raydium program
                webhookType: helius_sdk_1.WebhookType.RAW, // Use enum value WebhookType.RAW
            });
            console.log('Webhook created successfully:', webhook);
        }
        catch (error) {
            console.error('Error creating webhook:', error);
        }
    });
}
createWebhook();
