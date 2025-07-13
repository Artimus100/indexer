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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const webhookHandler_1 = require("./webhookHandler");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post('/webhook', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, webhookHandler_1.handleWebhook)(req.body);
        res.status(200).send('Event received');
    }
    catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Processing failed');
    }
}));
app.listen(config_1.config.webhookPort, () => {
    console.log(`Server running on port ${config_1.config.webhookPort}`);
});
