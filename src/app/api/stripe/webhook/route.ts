import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

import {
  createUserSubscription,
  cancelUserSubscription,
} from "@/actions/user-subscription";
import { NextResponse } from "next/server";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;
  const webHookSecret =
    process.env.NODE_ENV === "production"
      ? process.env.STRIPE_WEBHOOK_SECRET
      : process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

  if (!webHookSecret) {
    return NextResponse.json(
      { message: "Webhook secret not set" },
      { status: 400 }
    );
  }

  if (!signature) {
    return NextResponse.json({ message: "No signature" }, { status: 400 });
  }

  const event = stripe.webhooks.constructEvent(body, signature, webHookSecret);
  const data = event.data.object as Stripe.Subscription;

  if (relevantEvents.has(event.type)) {
    if (event.type === "customer.subscription.created") {
      const { customer } = data;
      await createUserSubscription({ stripeCustomerId: customer as string });
    } else if (event.type === "customer.subscription.deleted") {
      const { customer } = data;
      await cancelUserSubscription({ stripeCustomerId: customer as string });
    }
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
