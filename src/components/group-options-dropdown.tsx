'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react";
import { ExternalLinkIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Group } from "@/@types/group";
import useSWRMutation from "swr/mutation";

interface GroupOptionsDropdownProps {
  group: Group
}

async function sendRequest(url: string, { arg }: { arg: Group }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

const GroupOptionsDropdown = ({ group }: GroupOptionsDropdownProps) => {
  const { data: session } = useSession()
  const route = useRouter()

  const { trigger } = useSWRMutation('/api/groups/delete', sendRequest)

  const handleDelete = () => {
    trigger(group)
    .then(async (res) => await res.json())
    .then((res) => {
      console.log(res)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 items-center flex justify-center">
        <MoreHorizontalIcon size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => route.push('/groups')} 
          className="space-x-1">
          <ExternalLinkIcon size={16} />
          <span>Open</span>
        </DropdownMenuItem>

        {session?.user?.email === group.author.email && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleDelete}
              className="space-x-1">
              <TrashIcon size={16} />
              <span>Delete</span>
            </DropdownMenuItem>
          </>
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GroupOptionsDropdown
