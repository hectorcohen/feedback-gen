import { pricing_plans } from "@/lib/payments";
import PricingCard from "./pricing-card";



const PricingSection = () => {
    return (
        <div className="text-center">
            <h1 className="capitalize text-3xl">Pricing</h1>
            <h2 className="font-extrabold text-3xl mb-8">Flexible Pricing to Fit Your Needs</h2>
            <div className="mt-10 grid items-start grid-cols-1 gap-3 md:grid-cols-2 max-w-screen-xl">
                {
                    pricing_plans?.map(({title, description,price, features, isPopular, url}, index) => (
                        <PricingCard key={index} title={title} features={features} description={description} price={price} isPopular={isPopular} url={url} />
                    ))
                }
            </div>
        </div>
    )
}

export default PricingSection;