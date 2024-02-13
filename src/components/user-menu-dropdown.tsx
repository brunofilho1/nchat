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
import { MessageCircleIcon, PowerIcon, UserIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserMenuDropdown = () => {
  const { data: session } = useSession()
  const route = useRouter()

  const handleSignOut = async () => {
    await signOut()
    toast.success('Disconnected successfully!')
  }

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
          onClick={() => route.push('/groups')} 
          className="space-x-1">
          <UsersIcon size={16} />
          <span>Groups</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => route.push('/chat')} 
          className="space-x-1">
          <MessageCircleIcon size={16} />
          <span>Chat</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => route.push('/profile')}
          className="space-x-1">
          <UserIcon size={16} />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="space-x-1">
          <PowerIcon size={16} />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenuDropdown
