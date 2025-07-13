# 🌿 CaelumX Webhook Indexer

A  Solana transaction indexer using [Helius](https://www.helius.xyz/) Webhooks to stream on-chain events in real time. Built as part of [CaelumX](https://caelum-x.com) to track and index **carbon credit retirement** events.

---

## 📦 Features

- 🔁 **Real-time webhook listener** using Helius
- 🧠 Parses Solana transactions for key programs (e.g., carbon credit retirements)
- 💾 Stores structured data in **PostgreSQL** via **Prisma ORM**
- 🌐 Deployable to any public server or platform (Fly.io, Railway, EC2)
- 🔐 Runs behind HTTPS at `https://indexer.caelum-x.com/webhook`

---

## 📁 Folder Structure

📦 caelumx-indexer
├── prisma/ # Prisma schema + migrations
├── src/
│ ├── webhookHandler.ts # Main webhook POST handler
│ ├── config.ts # Helius API keys, environment configs
│ └── server.ts # Express server listener
├── createWebhook.ts # Script to register webhook with Helius
├── .env # Local environment vars (Helius key, DB URL)
├── README.md # You're here!
├── tsconfig.json
└── package.json

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. 📥 Clone the repo

```bash
git clone https://github.com/your-username/caelumx-indexer.git
cd caelumx-indexer
