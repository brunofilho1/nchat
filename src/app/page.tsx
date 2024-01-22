'use client'

import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="flex max-w-[500px] lg:max-w-[600px] m-auto space-y-6 flex-col p-24">
        <div className="flex flex-col text-center">
          <h1 className="text-4xl font-bold">Nchat</h1>
          <span className="">A web chat built with Next.js and Socket.io</span>
        </div>

        <div>
          <Button 
            className="w-full bg-slate-500 hover:bg-slate-700 text-white"
            onClick={async () => {
              'use client'
              await signIn('github', {
                callbackUrl: 'http://localhost:3000/chat'
              })
            }}
          >
            <GithubIcon size={16} />
            Github
          </Button>
        </div>
      </main>
    </div>
  );
}
