import Breadcrumbs from "@/components/breadcrumbs";
import FeedbackListDataTable from "@/components/feedbacks/feedback-table";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { projects as db_projects } from "@/db/schema";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { Globe, Workflow } from "lucide-react";
import Link from "next/link";

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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
        <div className="flex flex-col w-full">
          <Breadcrumbs
            data={[
              { title: "Dashboard", separator: true, navigation: "/dashboard" },
              {
                title: "Feedbacks",
                separator: false,
                disabled: true,
                navigation: `/projects/${params?.projectId}/`,
              },
            ]}
          />
          <div className="w-full">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
              <p className="text-slate-400">
                Created date:{" "}
                <small className="p-1 bg-violet-300 text-white rounded-sm font-bold">{format(project?.createdAt || new Date(), "yyy-MM-dd")}</small>
              </p>
            </div>
            <h2 className="text-xl mb-2">{project?.description}</h2>
          </div>
        </div>
        <div className="w-full flex justify-end gap-2">
          {project?.url && (
            <Link className="flex items-center" href={project.url}>
              <Button variant="link">
                <Globe className="text-indigo-400 h-5 w-5 mr-2" /> Visit Site
              </Button>
            </Link>
          )}

          <Link
            className="flex items-center"
            href={`${params.projectId}/integration`}
          >
            <Button variant="outline">
              <Workflow className="text-green-400 h-5 w-5 mr-2" /> Integrations
            </Button>
          </Link>
        </div>
      </div>
      <FeedbackListDataTable
        projectId={project?.id}
        feedbacks={project?.feedbacks || []}
      />
    </div>
  );
};

export default ProjectDetailPage;
