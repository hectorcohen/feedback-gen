import CreateProductForm from "@/components/projects/create-project-button";
import ProjectList from "@/components/projects/projects-table";
import { db } from "@/db";
import { projects as projects_schema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { MONTHLY_PLAN_ID } from "@/lib/payments";
import SubscribeButton from "@/components/subscribe-button";
import { getUserSubscription } from "@/actions/user-subscription";

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const projects = await db
    .select()
    .from(projects_schema)
    .where(eq(projects_schema.userId, userId));

  const subscribed = await getUserSubscription({ userId });

  return (
    <div>
      <div className="flex justify-between items-center">
        <CreateProductForm numberOfProjects={projects.length} subscribed={subscribed} />
        {!subscribed && <SubscribeButton price={MONTHLY_PLAN_ID} />}
      </div>
      <ProjectList projects={projects || []} />
    </div>
  );
}
