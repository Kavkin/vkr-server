-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INTERNET', 'IPTV');

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT false,
    "type" "Type" NOT NULL,
    "operatorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
