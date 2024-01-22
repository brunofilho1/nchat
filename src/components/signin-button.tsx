"use client"

import { GithubIcon } from "lucide-react";

import { buttonVariants } from "./ui/button";
import { signIn } from "next-auth/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

const SignInButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger 
        className={cn(buttonVariants({
          size: 'sm',
          className: "flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 px-4 py-2 text-white"
        }))}
        onClick={() => signIn('github', { callbackUrl: "/chat" })}
        type="button"
      >
        <GithubIcon size={16} />
        Sign In
      </TooltipTrigger>
      <TooltipContent align="center">
        <p>Sign Out</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SignInButton;