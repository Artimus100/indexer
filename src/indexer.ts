import WebSocket from 'ws';
import { config } from './config';
import { insertTransaction, initializeDatabase } from './database';

function connect() {
  const wsUrl = config.rpcUrl.replace('https://', 'wss://') + `?api-key=${config.heliusApiKey}`;
  console.log('Connecting to WebSocket:', wsUrl); // Debug URL
  const ws = new WebSocket(wsUrl);

  ws.on('open', () => {
    console.log('Connected to Helius WebSocket');
    const subscriptionRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'transactionSubscribe',
      params: [
        {
          accountInclude: ['675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'], // Raydium program
          failed: false,
        },
        {
          commitment: 'confirmed',
          encoding: 'jsonParsed',
          transactionDetails: 'full',
          maxSupportedTransactionVersion: 0,
        },
      ],
    };
    console.log('Sending subscription request:', JSON.stringify(subscriptionRequest, null, 2));
    ws.send(JSON.stringify(subscriptionRequest));
  });

  ws.on('message', async (data) => {
    console.log('Raw WebSocket message received:', data.toString()); // Debug raw message
    try {
      const message = JSON.parse(data.toString());
      if (message.params && message.params.result) {
        const transaction = message.params.result;
        const signature = transaction.signature;
        // Log all Raydium transactions for debugging
        console.log(`Received transaction: ${signature}`);
        await insertTransaction(signature, transaction);
        // Optional: Re-enable specific filter for pool creation
        const logs = transaction.transaction.meta.logMessages;
        if (logs.some((log: string) => log.includes('initialize2: InitializeInstruction2'))) {
          console.log(`Indexed Raydium pool creation: ${signature}`);
          await insertTransaction(signature, transaction);
        }
      } else {
        console.log('Non-transaction message:', message);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error, 'Raw data:', data.toString());
    }
  });

  ws.on('close', () => {
    console.log('WebSocket closed. Reconnecting in 5 seconds...');
    setTimeout(connect, 5000);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
}

async function start() {
  await initializeDatabase();
  connect();
}

start();
