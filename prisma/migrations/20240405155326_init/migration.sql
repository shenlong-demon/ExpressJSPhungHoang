-- CreateTable
CREATE TABLE "phuser" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" VARCHAR(255) DEFAULT '',
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phuser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phbrand" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phbrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phgroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phgroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phproduct" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50),
    "name" VARCHAR(255) NOT NULL,
    "otherName" VARCHAR(255),
    "image" VARCHAR(500),
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "brandId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phproduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "phuser_phone_key" ON "phuser"("phone");

-- AddForeignKey
ALTER TABLE "phproduct" ADD CONSTRAINT "phproduct_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "phbrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phproduct" ADD CONSTRAINT "phproduct_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "phgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
