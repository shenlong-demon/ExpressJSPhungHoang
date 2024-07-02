-- CreateTable
CREATE TABLE "phcustomer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appKey" TEXT,

    CONSTRAINT "phcustomer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "phcustomer_id_key" ON "phcustomer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phcustomer_phone_key" ON "phcustomer"("phone");
