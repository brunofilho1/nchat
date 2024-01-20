'use client'

import ThemeButton from "@/components/theme-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border border-b px-4 py-1 flex items-center justify-between">
        <span>Nchat</span>
        <ThemeButton />
      </header>
      <main className="flex max-w-[500px] lg:max-w-[600px] m-auto space-y-6 flex-col p-24">
        <div className="flex flex-col text-center">
          <h1 className="text-4xl font-bold">Nchat</h1>
          <span className="">A web chat built with Next.js and Socket.io</span>
        </div>
        <div className="w-full space-y-2"> 
          <Input placeholder="Enter your e-mail or username" />
          <Input placeholder="Enter your password" />        
        </div>

        <div>
          <Button  className="w-full">
            Login
          </Button>
        </div>

        <div>
          <Link href='/reset-password' 
          className={cn(buttonVariants({
            variant: 'link'
          }), 'p-0 justify-end flex')}>
            Forgot your password?
          </Link>
        </div>
      </main>
    </div>
  );
}
