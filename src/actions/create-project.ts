"use server"

import { db } from "@/db";
import { projects } from "@/db/schema";
import { project_schema_type } from "@/schemas/project/schema";
import { auth } from "@clerk/nextjs/server";

export async function create_project(values: project_schema_type) {
  const { userId } = auth();
  const project = {
    ...values,
    userId,
  };

  try {
    const new_project_id = await db
      .insert(projects)
      .values(project)
      .returning({ insertedId: projects.id });

    return new_project_id;
  } catch (error) {
    console.log("Error creating project", error);
  }
}
