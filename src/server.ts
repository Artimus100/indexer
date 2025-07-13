import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { handleWebhook } from './webhookHandler';
import { config } from './config';

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req: Request, res: Response) => {
  try {
    await handleWebhook(req.body);
    res.status(200).send('Event received');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Processing failed');
  }
});

app.listen(config.webhookPort, () => {
  console.log(`Server running on port ${config.webhookPort}`);
});