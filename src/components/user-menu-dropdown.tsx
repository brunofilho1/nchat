'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { MessageCircleIcon, PowerIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const UserMenuDropdown = () => {
  const { data: session } = useSession()
  const route = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({
        size: 'sm',
        variant: 'ghost',
        className: 'p-1'
      }))}>
        <Image 
          width={30}
          height={30}
          className='rounded-full'
          src={session?.user?.image as string} 
          alt="User Avatar" 
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => route.push('/chat')} 
          className="space-x-1">
          <MessageCircleIcon size={16} />
          <span>Chat</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => route.push('/settings')}
          className="space-x-1">
          <SettingsIcon size={16} />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut()}
          className="space-x-1">
          <PowerIcon size={16} />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenuDropdown
