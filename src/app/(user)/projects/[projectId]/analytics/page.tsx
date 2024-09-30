import GlobalChart, { FeedbacksChart } from "@/components/chart/chart";
import { db } from "@/db";
import { projects as db_projects } from "@/db/schema";
import { getRatingValue, Ratings } from "@/lib/chart";
import { eq } from "drizzle-orm";

export default async function AnalyticPage({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const projects = await db.query.projects.findMany({
    where: eq(db_projects.id, parseInt(params.projectId)),
    with: {
      feedbacks: true,
    },
  });

  const project = projects?.shift();

  const feedbacks = project?.feedbacks;

  const ratings: FeedbacksChart[] | undefined =
    feedbacks &&
    feedbacks?.map((feedback) => ({
      ...feedback,
      rating_key: getRatingValue(feedback.rating || 0).value,
      fill: getRatingValue(feedback.rating || 0).color,
    }));

  const aggregatedRatings = ratings?.reduce(
    (acc: Ratings[], item: FeedbacksChart) => {
      let found = acc.find((el: any) => el?.rating_key === item.rating_key);

      if (found) {
        found.total_rating += item.rating || 1;
        found.count += 1;
      } else {
        acc.push({
          rating_key: item.rating_key,
          total_rating: item.rating || 0,
          count: 1,
          fill: item.fill,
        });
      }

      return acc;
    },
    []
  );

  return (
    <div>
      <GlobalChart data={aggregatedRatings || []} />
    </div>
  );
}
