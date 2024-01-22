'use client'

import React, { ReactNode } from 'react';
import { ThemeProvider } from './ui/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { TooltipProvider } from './ui/tooltip';

interface ProvidersProps {
  children: ReactNode
  session: Session
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem        
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
