'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Profile() {
  const { data: session } = useSession()
  
  return (
    <main className="flex flex-col w-full min-h-[calc(100vh-4rem)] max-w-[650px] my-2 border rounded-md lg:max-w-[600px] m-auto space-y-6 py-6">
      <form className='flex flex-col px-10 space-x-2 space-y-4'>        
        <Image 
          width={100}
          height={100}
          className='rounded-full m-auto'
          src={session?.user?.image as string} 
          alt="User Avatar" 
        />
        <div className='space-y-1'>
          <Label>Name</Label>
          <Input
            disabled
            value={session?.user?.name as string}
            placeholder='Type your message here...' 
          />
        </div>
        <div className='space-y-1'>
          <Label>E-mail</Label>
          <Input
            disabled
            value={session?.user?.email as string}
            placeholder='Type your message here...' 
          />
        </div>
        <Button disabled type='button'>
          Save
        </Button>
      </form>
    </main>
  );
}
