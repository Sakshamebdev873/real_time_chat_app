-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "accessToken" DROP NOT NULL;
