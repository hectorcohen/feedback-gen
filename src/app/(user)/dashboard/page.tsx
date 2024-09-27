import CreateProductForm from "@/components/projects/create-project-button";
import ProjectList from "@/components/projects/list-projects";
import { db } from "@/db";
import { projects as projects_schema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const projects = await db
    .select()
    .from(projects_schema)
    .where(eq(projects_schema.userId, userId));

  return (
    <div>
      <CreateProductForm />
      <ProjectList projects={projects || []} />
    </div>
  );
}
