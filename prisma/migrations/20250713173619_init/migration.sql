-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "signature" TEXT NOT NULL,
    "ammId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_signature_key" ON "Transaction"("signature");
