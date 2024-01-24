'use client'

import { Group } from '@/@types/group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MessageCirclePlusIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
import useSWRMutation from 'swr/mutation';
import { v4 as uuid } from 'uuid'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { User } from '@/@types/user';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/swr';
async function sendRequest(url: string, { arg }: { arg: Group }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

export default function Groups() {
  const { data: session } = useSession()
  const { data: groups, isLoading } = useSWR<Group[]>('/api/groups', fetcher, {
    keepPreviousData: true,
  })
  const { trigger } = useSWRMutation('/api/groups', sendRequest)
  const [newGroup, setNewGroup] = useState({
    name: '',
    color: ''
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
    <main className="flex flex-col w-full min-h-[calc(100vh-4rem)] max-w-[650px] my-2 border rounded-md lg:max-w-[600px] m-auto space-y-6 p-6">
      <h1 className='text-2xl font-black'>Groups</h1>

      <Separator />

      <div className='flex items-center justify-between space-x-2'>
        <Input 
          placeholder='Filter groups by name...' 
          className='w-full max-w-[250px] lg:max-w-[300px]'
        />
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
                  className="col-span-2 h-8"
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
                    className="col-span-2 h-8"
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
      </div>

      <div className='border p-2 rounded-md'>
        <div className='grid grid-cols-3 p-2 border-b rounded-md font-bold text-sm'>
          <span>Name</span>
          <span>Included By</span>
          <span>Included At</span>
        </div>
        {isLoading && (
        <div className='grid grid-cols-3 p-2 space-x-4 hover:bg-accent rounded-md'>
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
        )}
        {groups?.map((group) => (
          <div key={group.id} className='grid grid-cols-3 p-2 hover:bg-accent rounded-md'>
            <Link 
              href={{
                pathname: '/chat',
                query: {
                  group: group.id,
                },
              }}
              className='text-blue-400 hover:underline'
            >
              {group.name}
            </Link>
            <span>{group.author.name}</span>
            <span>{new Date(group.includedAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
