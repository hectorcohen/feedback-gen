import React from "react";

type Props = {
  params: {
    projectId: string;
  };
};

const IntegrationPage: React.FC<Props> = ({ params }) => {
  if (!params.projectId) return <div>Invalid Project ID.</div>;
  if (!process.env.WIDGET_URL) return <div>Missing the Widget URL</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
      <p className="text-lg text-secondary-foreground">
        Embed the code in your website.
      </p>
      <div>
        <code>
          {`<my-widget project-id="${params.projectId}"></my-widget>`}
          <br />
          {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
        </code>
      </div>
    </div>
  );
};

export default IntegrationPage;
