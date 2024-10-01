export const MONTHLY_PLAN_ID = "price_1Q3ixSDKlRcxFi5UehPorGje";
export const YEARLY_PLAN_ID = "price_1Q3izhDKlRcxFi5UaBMU9pc4";
export const MAX_FREE_PROJECTS: number = 5;

export type PricingPlan = {
  title: string;
  price: number;
  description: string;
  isPopular?: boolean;
  features: string[];
  url: string;
};

export const pricing_plans: PricingPlan[] = [
  {
    title: "Free",
    price: 0,
    description: "For small teams just getting started",
    isPopular: false,
    features: ["1 Project", "Unlimited feedbacks"],
    url: '/dashboard/'
  },
  {
    title: "Pro",
    price: 7.9,
    description: "For growing teams",
    isPopular: true,
    features: [
      "10 Projects",
      "Unlimited users",
      "Email actions",
      "Priority support",
    ],
    url: '/payments/subscribe?plan=pro'
  },
];

export type SubscribeTextTypes = "pro" | "free"
