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
import { buttonVariants } from "./ui/button";
import { Group } from "@/@types/group";
import { useEffect, useState } from "react";
import { User } from "@/@types/user";
import { useAtom } from "jotai";
import { socketConnection } from "@/atoms/socket.atom";

interface GroupDropdownProps {
  group: Group
}

interface SocketUser extends User {
  socketId: string
}

const GroupDropdown = ({ group }: GroupDropdownProps) => {
  const [socket] = useAtom(socketConnection)
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([])

  useEffect(() => {
    socket?.emit('get_online_users', { groupId: group?.id })

    socket?.on('get_online_users', (data: SocketUser[]) => {
      setOnlineUsers(data)
    })

    socket?.on('leave_group', (socketId: string) => {
      setOnlineUsers((prevState) => {
        return [...prevState.filter((u) => u.socketId !== socketId)]
      })
    })
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({
        variant: 'outline',
      }))}>
        <div className='flex items-center space-x-2'>
          <div className='w-4 h-4 rounded-full' style={{
            backgroundColor: group?.color
          }} />
          <span>{group?.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Online Users</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!onlineUsers || onlineUsers.length === 0 ? <span className="text-muted-foreground text-sm text-center w-full">Nobody online...</span> : onlineUsers.map((user) => (
          <DropdownMenuItem
            key={user.email}
            className="space-x-1 flex justify-between">
            <span>{user?.name}</span>
            <div className='w-3 h-3 rounded-full bg-emerald-500' />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GroupDropdown
