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
import { MoreHorizontalIcon, PenIcon, TrashIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Message } from "@/@types/message";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { useAtom } from "jotai";
import { socketConnection } from "@/atoms/socket.atom";

interface MessageOptionsDropdown {
  message: Message
  setMessages: Dispatch<SetStateAction<Message[]>>
}

async function sendRequest(url: string, { arg }: { arg: Message }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

const MessageOptionsDropdown = ({ message, setMessages }: MessageOptionsDropdown) => {
  const { data: session } = useSession()
  const { trigger } = useSWRMutation('/api/messages/delete', sendRequest)
  const [socket] = useAtom(socketConnection)

  const handleDelete = () => {
    trigger(message)
    .then(async (res) => await res.json())
    .then((res) => {
      console.log(res)
      setMessages((prevState) => {
        return [...prevState.filter((m) => m !== message)]
      })

      socket?.emit('delete_message', message as Message);
    })
  }

  if (session?.user?.email !== message.author.email) return

  return (
    <div className="absolute right-1 top-1">
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(buttonVariants({
          size: 'sm',
          variant: 'ghost',
          className: 'opacity-0 group-hover:opacity-100 rounded-md w-8 h-8 p-1 backdrop-blur-sm'
        }))}>
          <MoreHorizontalIcon size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Message Options</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => console.log('Edit message')}
            className={cn(buttonVariants({
              size: 'sm',
              variant: 'ghost',
              className: 'space-x-1 flex justify-between'
            }))}
          >
            <span>Edit</span>
            <PenIcon size={16} />
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDelete}
            className={cn(buttonVariants({
              size: 'sm',
              variant: 'destructive',
              className: 'space-x-1 flex justify-between'
            }))}
          >
            <span>Delete</span>
            <TrashIcon size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MessageOptionsDropdown
