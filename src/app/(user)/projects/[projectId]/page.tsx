import React from "react";
import { db } from "@/db";
import { projects as db_projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Globe, Workflow } from "lucide-react";
import FeedbackListDataTable from "@/components/projects/feedback-table";
import { Button } from "@/components/ui/button";

const ProjectDetailPage = async ({
  params,
}: {
  params: {
    projectId: string;
  };
}) => {
  if (!params.projectId) return <div>Invalid projectId</div>;

  const projects = await db.query.projects.findMany({
    where: eq(db_projects.id, parseInt(params.projectId)),
    with: {
      feedbacks: true,
    },
  });

  const project = projects?.shift();
  console.log(project?.feedbacks);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
          <h2 className="text-xl mb-2">{project?.description}</h2>
        </div>
        <div className="flex flex-end gap-2">
        {project?.url && (
          <Link
            className="flex items-center"
            href={project.url}
          >
           <Button variant="link">
            <Globe className="text-indigo-400 h-5 w-5 mr-2" /> Visit Site
           </Button>
          </Link>
        )}

        <Link
          className="flex items-center"
          href={`${params.projectId}/integration`}
        >
         <Button variant="outline"><Workflow className="text-green-400 h-5 w-5 mr-2" /> Integrations</Button>
        </Link>
        </div>
      </div>
      <FeedbackListDataTable feedbacks={project?.feedbacks || []} />
    </div>
  );
};

export default ProjectDetailPage;
