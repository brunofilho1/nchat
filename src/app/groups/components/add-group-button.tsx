import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { PlusIcon, MessageCirclePlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import { v4 as uuid } from 'uuid'
import { User } from "@/@types/user";
import { Group } from "@/@types/group";

async function sendRequest(url: string, { arg }: { arg: Group }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

const AddGroupButton = () => {
  const { data: session } = useSession()
  const { trigger } = useSWRMutation('/api/groups', sendRequest)
  const [newGroup, setNewGroup] = useState({
    name: '',
    color: '#3b82f6'
  })

  const handleSubmit = () => {
    trigger({
      id: uuid(),
      author: session?.user as User,
      name: newGroup.name,
      color: newGroup.color,
      includedAt: new Date()
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PlusIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">New Group</h4>
            <p className="text-sm text-muted-foreground">
              Set the settings for the new group.
            </p>
          </div>

          <Separator />

          <form
            onSubmit={handleSubmit}
            className='flex flex-col space-y-2'
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder='"Tech chat for devs..."'
                value={newGroup.name}
                onChange={(e) => setNewGroup({
                  ...newGroup,
                  name: e.target.value,
                })}
                required
                className="h-8"
              />
            </div>

            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="name"
                type='color'
                value={newGroup.color}
                onChange={(e) => setNewGroup({
                  ...newGroup,
                  color: e.target.value
                })}
                required
                className="h-8 p-0"
              />
            </div>

            <div className='flex flex-col pt-4'>
              <Label className='sr-only'>Submit</Label>
              <Button
                type='submit'
                disabled={!newGroup}
                size='sm'
                className='space-x-1'
              >
                <MessageCirclePlusIcon size={16} />
                <span>Submit</span>
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AddGroupButton
