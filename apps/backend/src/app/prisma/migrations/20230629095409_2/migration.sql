-- DropForeignKey
ALTER TABLE "GroupOnTemplate" DROP CONSTRAINT "GroupOnTemplate_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupOnTemplate" DROP CONSTRAINT "GroupOnTemplate_templateId_fkey";

-- AddForeignKey
ALTER TABLE "GroupOnTemplate" ADD CONSTRAINT "GroupOnTemplate_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupOnTemplate" ADD CONSTRAINT "GroupOnTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
