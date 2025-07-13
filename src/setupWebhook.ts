import { Helius, WebhookType, TransactionType } from 'helius-sdk';
import { config } from './config';

async function createWebhook() {
  try {
    const helius = new Helius(config.heliusApiKey);
    
    const webhook = await helius.createWebhook({
      webhookURL: 'http://your-server.com/webhook', 
      transactionTypes: [TransactionType.TRANSFER], 
      accountAddresses: ['675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'], 
      webhookType: WebhookType.RAW, 
    });

    console.log('Webhook created successfully:', webhook);
  } catch (error) {
    console.error('Error creating webhook:', error);
  }
}

createWebhook();
