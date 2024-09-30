import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUserSubscription({
  stripeCustomerId,
}: {
  stripeCustomerId: string;
}) {
  await db
    .update(subscriptions)
    .set({
      subscribed: true,
    })
    .where(eq(subscriptions.stripeSubscriptionId, stripeCustomerId));
}

export async function cancelUserSubscription({
  stripeCustomerId,
}: {
  stripeCustomerId: string;
}) {
  await db
    .update(subscriptions)
    .set({
      subscribed: false,
    })
    .where(eq(subscriptions.stripeSubscriptionId, stripeCustomerId));
}

export async function getUserSubscription({ userId }: { userId: string }) {
  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
  return userSubscription?.subscribed;
}