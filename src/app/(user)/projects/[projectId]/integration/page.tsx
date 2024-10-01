import Breadcrumbs from "@/components/breadcrumbs";
import Code from "@/components/code";
import TitleComponent from "@/components/title-component";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import React from "react";

type Props = {
  params: {
    projectId: string;
  };
};

const IntegrationPage: React.FC<Props> = ({ params }) => {
  if (!params.projectId) return <div>Invalid Project ID.</div>;
  if (!process.env.WIDGET_URL) return <div>Missing the Widget URL</div>;

  const codeString = "(num) => num + 1";

  return (
    <div>
      <Breadcrumbs
        data={[
          { title: "Dashboard", separator: true, navigation: "/dashboard" },
          {
            title: "Feedbacks",
            separator: true,
            navigation: `/projects/${params.projectId}`,
          },
          { title: "Integration", disabled: true, navigation: "" },
        ]}
      />
      <TitleComponent
        title="Start Collecting Feedback"
        description=" Embed the code in your website."
      />
      <div>
        <div className="flex justify-end items-center">
          <Button>
            Copy <Clipboard className="w-5 h-5 ml-2" />
          </Button>
        </div>
        <Code language="html" highlightedLines="1,2">
          {`<my-widget project-id="${params.projectId}">
</my-widget><script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        </Code>
      </div>
    </div>
  );
};

export default IntegrationPage;
