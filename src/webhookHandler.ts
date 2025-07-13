import { PrismaClient } from '../generated/prisma'

import { WebhookEvent, TransactionData } from './types';

export const prisma = new PrismaClient();

export const handleWebhook = async (event: WebhookEvent) => {
  const transaction: TransactionData = {
    signature: event.signature,
    timestamp: new Date(),
  };

  const logs = event.transaction?.meta?.logMessages || [];
  const accountKeys = event.transaction?.transaction?.message?.accountKeys.map(ak => ak.pubkey) || [];

  if (logs.some(log => log.includes('initialize2: InitializeInstruction2'))) {
    transaction.ammId = accountKeys[2]; 
    await prisma.transaction.create({
      data: {
        signature: transaction.signature,
        ammId: transaction.ammId,
        timestamp: transaction.timestamp,
      },
    });
    console.log(`New Raydium pool: ${transaction.signature}`);
  }
};