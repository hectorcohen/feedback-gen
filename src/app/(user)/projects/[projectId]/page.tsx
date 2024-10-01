import Breadcrumbs from "@/components/breadcrumbs";
import FeedbackListDataTable from "@/components/feedbacks/feedback-table";
import TitleComponent from "@/components/title-component";
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
      <TitleComponent
        title={project?.name ?? ""}
        description={project?.description ?? ""}
        buttonAction={
          <div className="flex justify-end gap-3 items-center">
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
                <Workflow className="text-green-400 h-5 w-5 mr-2" />{" "}
                Integrations
              </Button>
            </Link>
          </div>
        }
      />
      <FeedbackListDataTable
        projectId={project?.id}
        feedbacks={project?.feedbacks || []}
      />
    </div>
  );
};

export default ProjectDetailPage;
