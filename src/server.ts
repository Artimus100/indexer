// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import { handleWebhook } from './webhookHandler';
// import { config } from './config';

// const app = express();
// app.use(bodyParser.json());

// app.post('/webhook', async (req: Request, res: Response) => {
//   try {
//     await handleWebhook(req.body);
//     res.status(200).send('Event received');
//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(500).send('Processing failed');
//   }
// });

// app.listen(config.webhookPort, () => {
//   console.log(`Server running on port ${config.webhookPort}`);
// });
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { insertTransaction } from './database';
import { config } from './config';

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req: Request, res: Response) => {
  try {
    const event = req.body;
    if (event && event.transaction) {
      const transaction = event.transaction;
      const signature = transaction.signature;
      const logs = transaction.transaction?.meta?.logMessages || [];

      // Optional: Filter for specific logs (e.g., Raydium pool creation)
      if (logs.some((log: string) => log.includes('initialize2: InitializeInstruction2'))) {
        await insertTransaction(signature, transaction);
        console.log(`Indexed Raydium pool creation: ${signature}`);
      } else {
        console.log(`Received transaction: ${signature}`);
      }
    }
    res.status(200).send('Event received');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Processing failed');
  }
});

app.listen(config.webhookPort, () => {
  console.log(`Server running on port ${config.webhookPort}`);
});