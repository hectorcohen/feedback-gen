import React from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton ,UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import HeaderMenu from "./header-menu";

const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all">
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20">
        <div className="flex h-14 items-center justify-between">
          <h1>Feedback Light</h1>
          <div>
            <SignedOut>
              <SignInButton >
                <Button>Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="ml-2">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-start items-center">
              <HeaderMenu />
              <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
