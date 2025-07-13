import dotenv from 'dotenv';
dotenv.config();

export const config = {
  heliusApiKey: process.env.HELIUS_API_KEY || '',
  webhookPort: process.env.WEBHOOK_PORT ? parseInt(process.env.WEBHOOK_PORT) : 3000,
  databaseUrl: process.env.DATABASE_URL || '',
rpcUrl: process.env.RPC_URL || 'https://mainnet.helius-rpc.com',

};
