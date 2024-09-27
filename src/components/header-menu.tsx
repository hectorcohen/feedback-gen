import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CreditCard, Folder, Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";


const HeaderMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mr-2" variant="ghost">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
            <Link className="flex" href="/dashboard">
             <Folder className="h-5 w-5 mr-2"/> Projects
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Link className="flex" href="/payments">
             <CreditCard className="h-5 w-5 mr-2"/> Billing
            </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
