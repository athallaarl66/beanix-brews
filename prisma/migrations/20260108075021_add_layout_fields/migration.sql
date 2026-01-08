-- AlterEnum
ALTER TYPE "PlanType" ADD VALUE 'CUSTOM';

-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "customDesignPath" TEXT,
ADD COLUMN     "hasCustomDesign" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "layoutConfig" JSONB DEFAULT '{}',
ADD COLUMN     "layoutTemplate" TEXT NOT NULL DEFAULT 'classic';

-- CreateIndex
CREATE INDEX "businesses_plan_idx" ON "businesses"("plan");
