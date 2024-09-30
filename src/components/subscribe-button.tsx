"use client";
import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Lock } from "lucide-react";

type Props = {
  price: string;
};

const SubscribeButton = ({ price }: Props) => {
  const onCheckout = async (price: string) => {
    const { sessionId } = await fetch("/api/stripe/checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    }).then((res) => res.json());

    const stripe = await getStripe();
    if (stripe) {
      stripe.redirectToCheckout({ sessionId });
    }
  };

  const { mutate: onCheckoutMutation, isPending } = useMutation({
    mutationFn: onCheckout,
  });

  return (
    <Button onClick={() => onCheckoutMutation(price)} disabled={isPending}>
      <Lock className="h-5 w-5 mr-2" />
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Subscribe"
      )}
    </Button>
  );
};

export default SubscribeButton;
