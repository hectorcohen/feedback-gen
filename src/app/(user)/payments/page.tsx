import { db } from "@/db";
import { subscriptions as subscriptions_schema } from "@/db/schema";
import classNames from "classnames";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import ManageSubscriptions from "@/components/manage-subscriptions";

const PaymentPage = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const subscriptions = await db.query.subscriptions.findFirst({
    where: eq(subscriptions_schema.userId, userId),
  });

  const plan = subscriptions && subscriptions?.subscribed ? "premium" : "free";

  return (
    <div className=" flex flex-col justify-start items-start gap-2 p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Subscription Details.</h1>
      <div className="flex flex-start items-center">
        <p className="text-lg mr-2">Your current plan is: </p>
        <span
          className={classNames('px-2 rounded-sm font-bold capitalize', {
            ["bg-green-200 text-green-600"]: plan === "free",
            ["bg-indigo-200 text-indigo-600"]: plan === "premium",
          })}
        >
          {plan}
        </span>
      </div>

      <ManageSubscriptions />
    </div>
  );
};

export default PaymentPage;
