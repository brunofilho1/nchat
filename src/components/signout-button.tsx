"use client";

import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { PowerIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

const SignOutButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger 
        className={cn(buttonVariants({
          size: 'sm',
          className: "flex items-center bg-slate-600 hover:bg-slate-700 text-white"
        }))}
        onClick={() => signOut({ callbackUrl: "/" })}
        type="button"
      >
        <PowerIcon size={16} />
      </TooltipTrigger>
      <TooltipContent align="center">
        <p>Sign Out</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SignOutButton;