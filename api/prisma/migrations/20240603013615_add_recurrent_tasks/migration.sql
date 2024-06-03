-- CreateTable
CREATE TABLE "TransactionRecurrent" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "walletId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "nextDate" TIMESTAMP(3) NOT NULL,
    "lastDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "dateFinish" TIMESTAMP(3),

    CONSTRAINT "TransactionRecurrent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionRecurrent" ADD CONSTRAINT "TransactionRecurrent_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRecurrent" ADD CONSTRAINT "TransactionRecurrent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
