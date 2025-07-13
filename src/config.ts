import dotenv from 'dotenv';
dotenv.config();

export const config = {
  heliusApiKey: process.env.HELIUS_API_KEY || '',
  webhookPort: process.env.WEBHOOK_PORT ? parseInt(process.env.WEBHOOK_PORT) : 3000,
  databaseUrl: process.env.DATABASE_URL || '',
};
import { Helius } from 'helius-sdk';
import { config } from './config';

const helius = new Helius(config.heliusApiKey);

async function createWebhook() {
  const webhook = await helius.createWebhook({
    accountAddresses: ['675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'],
    transactionTypes: ['ANY'],
    webhookURL: 'http://your-server.com/webhook',
    webhookType: 'raw',
  });
  console.log('Webhook created:', webhook);
}

createWebhook();