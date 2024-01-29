'use client'

import { Group } from '@/@types/group';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/swr';
import AddGroupButton from './components/add-group-button';
import { useState } from 'react';
import { useDebounceValue } from '../hooks/useDebounce';
import EmptyGroups from '@/components/empty-groups';

export default function Groups() {
  const [search, setSearch] = useState('')
  const searchTerm = useDebounceValue(search, 500)

  const { data: groups, isLoading } = useSWR<Group[]>(`/api/groups?search=${searchTerm}`, fetcher, {
    keepPreviousData: true,
  })

  return (
    <main className="flex flex-col w-full min-h-[calc(100vh-4rem)] max-w-[650px] my-2 border rounded-md lg:max-w-[600px] m-auto space-y-6 p-6">
      <h1 className='text-2xl font-black'>Groups</h1>

      <Separator />

      <div className='flex items-center justify-between space-x-2'>
        <Input
          placeholder='Filter groups by name...'
          onChange={(e) => setSearch(e.target.value)}
          className='w-full max-w-[250px] lg:max-w-[300px]'
        />
        <AddGroupButton />
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
          <div key={group._id} className='grid grid-cols-3 p-2 hover:bg-accent rounded-md'>
            <Link
              href={{
                pathname: '/chat',
                query: {
                  group: group._id,
                },
              }}
              className='hover:underline font-semibold'
              style={{
                color: group?.color
              }}
            >
              {group.name}
            </Link>
            <span>{group.author.name}</span>
            <span>{new Date(group.includedAt).toLocaleDateString()}</span>
          </div>
        ))}
        {groups?.length === 0 && <EmptyGroups />}
      </div>
    </main>
  );
}
