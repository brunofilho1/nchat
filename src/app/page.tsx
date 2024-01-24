'use client'

import { Button } from "@/components/ui/button";
import { BiSolidMessage } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <div className="flex flex-col justify-center m-auto w-full max-w-[400px] px-4 h-screen space-y-4 pb-[400px]">      
        <div className="flex flex-col text-center">
          <h1 className="text-4xl font-bold">Nchat</h1>
          <span className="">Welcome again to Nchat! Let&apos;s talk, it&apos;s fast.</span>
        </div>

        <Button
          className="w-full space-x-1"
          onClick={async () => router.push('/groups')}
        >
          <BiSolidMessage size={16} />
          <span>Go to Groups</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main className="flex flex-col justify-center m-auto w-full max-w-[400px] px-4 h-screen space-y-4 pb-[400px]">
        <div className="flex flex-col text-center">
          <h1 className="text-4xl font-bold">Nchat</h1>
          <span className="">A web chat built with Next.js and Socket.io</span>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full bg-slate-500 hover:bg-slate-700 text-white space-x-1"
            onClick={async () => {
              await signIn('github', {
                callbackUrl: '/groups'
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
                callbackUrl: '/groups'
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
