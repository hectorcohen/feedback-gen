"use client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const ManageSubscriptions = () => {
  const router = useRouter();

  const redirectToPortal = async () => {
    const { url: response } = await fetch("/api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return response; 
  };

  const { mutate: redirectToPortalMutation, isPending } = useMutation({
    mutationFn: redirectToPortal,
    onSuccess: (({url}) => {
        router.push(url)
    })
  });

  return (
    <Button onClick={() => redirectToPortalMutation()}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Please Wait...
        </>
      ) : (
        "Modify Your Subscription"
      )}
    </Button>
  );
};

export default ManageSubscriptions;
