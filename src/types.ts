export interface WebhookEvent {
  signature: string;
  transaction: {
    meta: {
      logMessages: string[];
    };
    transaction: {
      message: {
        accountKeys: { pubkey: string }[];
      };
    };
  };
}

export interface TransactionData {
  signature: string;
  ammId?: string;
  timestamp: Date;
}