'use client'

import { Message } from '@/@types/message';
import { User } from '@/@types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonalIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation';
import { v4 as uuid } from 'uuid'
import { Socket, io } from 'socket.io-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import Spinner from '@/components/spinner';
import EmptyMessages from '@/components/empty-messages';

const fetcher = (url: string) => fetch(url)
.then((res) => res.json())
.then((res) => res.data as Message[])

async function sendRequest(url: string, { arg }: { arg: Message }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

interface SocketMessage extends Message  {
  groupId: string
}

const socket = io("http://localhost:3001")

export default function Chat() {
  const router = useRouter()
  const groupId = useSearchParams().get('group')
  const { data: session } = useSession()
  const { data: messages, isLoading, mutate } = useSWR('/api/messages', fetcher, {
    keepPreviousData: false,
    revalidateOnFocus: false,
  })
  const { trigger } = useSWRMutation('/api/messages', sendRequest)
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newMessage: Message = {
      id: uuid(),
      author: session?.user as User,
      body: message,
      includedAt: new Date()
    }
    
    trigger(newMessage)
    
    socket?.emit('send_message', {
      ...newMessage,
      groupId,
    });

    return setMessage('')
  }

  useEffect(() => {
    socket?.emit("join_group", groupId);
    socket?.on('receive_message', (data: SocketMessage) => {
      const newMessage: Message = {
        ...data
      }
      mutate([newMessage])
    })
  }, [])

  if (!groupId) router.push('/groups')
  
  return (
    <main className="flex flex-col justify-between w-full min-h-[calc(100vh-4rem)] max-w-[650px] my-2 border rounded-md lg:max-w-[600px] m-auto space-y-6 py-6">
      <div className='flex items-center px-10 space-x-2 justify-between'>
        <div className='flex items-center space-x-2'>
          <Image 
            width={20}
            height={20}
            className='rounded-full'
            src={session?.user?.image as string} 
            alt="User Avatar" 
          />
          <span>{session?.user?.name}</span>
        </div>
        <h1>Chat</h1>
      </div>

      <div className="h-[calc(100vh-14rem)] overflow-y-scroll w-full flex flex-col space-y-2 px-4">
        {isLoading && <Spinner />}
        {messages && messages.length === 0 ? (
          <EmptyMessages />
        ): (
          messages?.map((message) => (
            <div 
              data-itsme={message.author.email === session?.user?.email} 
              key={message.id} 
              className='data-[itsme=true]:self-end border p-4 w-fit rounded-md'
            >
              <div className='flex items-center space-x-4 justify-between'>
              <div className='flex items-center space-x-2 text-muted-foreground'>
                <Image 
                  width={20}
                  height={20}
                  className='rounded-full'
                  src={message.author.image as string} 
                  alt="User Avatar" 
                />
                <span>{message.author.name}</span>
              </div>
                <span className='text-sm text-muted-foreground'>{new Date(message.includedAt).toLocaleTimeString()}</span>
              </div>
              <p>{message.body}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className='flex items-center px-10 space-x-2'>
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type your message here...' 
        />
        <Button type='submit'>
          <SendHorizonalIcon size={16} />
        </Button>
      </form>
    </main>
  );
}
