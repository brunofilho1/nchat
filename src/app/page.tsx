'use client'

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="flex max-w-[500px] lg:max-w-[600px] m-auto space-y-6 flex-col p-24">
        <div className="flex flex-col text-center">
          <h1 className="text-4xl font-bold">Nchat</h1>
          <span className="">A web chat built with Next.js and Socket.io</span>
        </div>

        <div className="space-y-2">
          <Button 
            className="w-full bg-slate-500 hover:bg-slate-700 text-white space-x-1"
            onClick={async () => {
              await signIn('github', {
                callbackUrl: 'http://localhost:3000/groups'
              })
            }}
          >
            <FaGithub size={16} />
            <span>Github</span>
          </Button>
          <Button 
            className="w-full space-x-1"
            onClick={async () => {
              await signIn('google', {
                callbackUrl: 'http://localhost:3000/groups'
              })
            }}
          >
            <FcGoogle size={16} />
            <span>Google</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
