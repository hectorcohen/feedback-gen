import SubscribeButton from "@/components/subscribe-button";
import { MONTHLY_PLAN_ID } from "@/lib/payments";

const Page = ({
  searchParams,
}: {
  searchParams: {
    plan: string;
  };
}) => {
  const { plan } = searchParams;

  return (
    <div>
      <h1 className="text-4xl">Subscription</h1>
      <div className="flex mt-4 border p-6 items-center gap-3 flex-col rounded-md md:flex-row">
        <h1>Start your subscription now:</h1>
        <div>
          {plan === "pro" && (
            <SubscribeButton price={plan == "pro" ? MONTHLY_PLAN_ID : ""} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
