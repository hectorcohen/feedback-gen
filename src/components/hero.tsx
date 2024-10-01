import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github, LogIn } from "lucide-react";
import gif from "@/app/public/demo-feedback.gif";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="grow mb-9">
      <div className="container flex flex-col md:flex-col lg:flex-row mx-auto  my-24">
        <div className="flex flex-col max-w-lg md:max-w-lg lg:max-w-md justify-end">
          <div className=" mb-8">
            <h1 className="text-5xl font-extrabold">
              Collet your feedbacks seamlessly
            </h1>
            <p className="text-gray-500 text-lg">
              Easily Integrate FeedbackLight code and start collecting feedback
              today.
            </p>
          </div>
          <div className="flex justify-start gap-3 items-center">
            <SignedOut>
              <SignInButton>
                <div className="flex justify-start gap-3">
                  <Button>
                    Get started
                    <LogIn className="w-5 h-5 ml-2" />
                  </Button>
                  <Button>
                    Github <Github className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
        <div className="flex-1 p-2 rounded-sm  lg:p-0 mt-4 lg:border-none lg:flex border">
          <Image
            alt="demo"
            src={gif}
            width={400}
            height={400}
            unoptimized={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
