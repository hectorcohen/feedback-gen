"use client";
import { PricingPlan } from "@/lib/payments";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const PricingCard: React.FC<PricingPlan> = ({
  title,
  price,
  description,
  features,
  isPopular,
  url,
}) => {
  const router = useRouter();

  const onNavigate = () => router.push(url);

  return (
    <div className="border flex flex-col justify-between bg-white/20 rounded-lg p-6 hover:shadow-md text-left relative w-full h-full">
      {isPopular && (
        <div className="absolute top-0 right-0 bg-gray-900 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg">
          Popular
        </div>
      )}
      <div>
        <div className="inline-flex items-end">
          <h1 className="font-extrabold text-3xl">${price}</h1>
        </div>
        <h2 className="font-bold text-xl my-2">{title}</h2>
        <p>{description}</p>
        <div className="flex-grow border-t border-gray-500 opacity-25 my-3"></div>
        <ul>
          {features?.map((feature, index) => (
            <li
              className="flex flex-row items-center text-gray-700 gap-2 my-2"
              key={index}
            >
              <div className="bg-black p-1 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>{" "}
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-4">
        <Button onClick={onNavigate} className="w-full">
          Select Plan
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
