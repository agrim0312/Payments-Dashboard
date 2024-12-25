-- CreateTable
CREATE TABLE "P2PTransfers" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3),
    "sentUserId" INTEGER NOT NULL,
    "recievedUserId" INTEGER NOT NULL,

    CONSTRAINT "P2PTransfers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "P2PTransfers" ADD CONSTRAINT "P2PTransfers_sentUserId_fkey" FOREIGN KEY ("sentUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransfers" ADD CONSTRAINT "P2PTransfers_recievedUserId_fkey" FOREIGN KEY ("recievedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
