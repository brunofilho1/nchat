'use server'

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import Header from "@/components/header";
import { Session, getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import { authOptions } from "./api/auth/[...nextauth]/route";

const metadata: Metadata = {
  title: "Nchat - Your Chat App",
  description: "NChat is a webchat with Next.js & Socket.io",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className='min-h-screen'>
        <Providers session={session as Session}>
          <div>
            <Header />
            <Toaster richColors />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
