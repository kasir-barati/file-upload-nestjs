-- CreateEnum
CREATE TYPE "Mimetype" AS ENUM ('image/png', 'image/jpeg', 'image/bmp', 'image/gif', 'image/svg+xml');

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "mimetype" "Mimetype",
ADD COLUMN     "size" INTEGER;
