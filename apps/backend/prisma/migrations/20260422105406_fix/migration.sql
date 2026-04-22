/*
  Warnings:

  - The `preferredPosition` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PreferredPosition" AS ENUM ('GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD');

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "preferredPosition",
ADD COLUMN     "preferredPosition" "PreferredPosition";

-- DropEnum
DROP TYPE "PreferredPostion";
