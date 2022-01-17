-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email_address" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_unique_constraint" ON "user"("email_address");
