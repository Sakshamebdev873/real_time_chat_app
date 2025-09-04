-- AlterTable
ALTER TABLE "public"."Group" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
