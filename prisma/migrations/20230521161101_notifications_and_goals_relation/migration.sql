-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "goal_id" TEXT;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "Goals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
