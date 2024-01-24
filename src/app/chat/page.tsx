'use client'

import { Message } from '@/@types/message';
import { User } from '@/@types/user';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonalIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation';
import { v4 as uuid } from 'uuid'
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/components/spinner';
import EmptyMessages from '@/components/empty-messages';
import { Group } from '@/@types/group';
import { fetcher } from '@/lib/swr';
import { TiArrowBack } from "react-icons/ti";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import GroupDropdown from '@/components/group-dropdown';
import { useAtom } from 'jotai';
import { socketConnection } from '@/atoms/socket.atom';

async function sendRequest(url: string, { arg }: { arg: Message }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}

interface SocketMessage extends Message {
  groupId: string
}

export default function Chat() {
  const router = useRouter()
  const [socket] = useAtom(socketConnection)
  const groupId = useSearchParams().get('group')
  const { data: session } = useSession()
  const { data, isLoading } = useSWR<Message[]>('/api/messages', fetcher, {
    keepPreviousData: false,
    revalidateOnFocus: false,
  })
  const { data: group } = useSWR<Group>(`/api/groups?groupId=${groupId}`, fetcher, {
    keepPreviousData: true,
  })
  const [messages, setMessages] = useState(data || [])
  const { trigger } = useSWRMutation('/api/messages', sendRequest)
  const [message, setMessage] = useState('')
  const chatContainerRef = useRef<any>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newMessage: Message = {
      id: uuid(),
      author: session?.user as User,
      body: message,
      includedAt: new Date()
    }

    trigger(newMessage)

    setMessages((prevState) => {
      return [...prevState, newMessage]
    })

    socket?.emit('send_message', {
      ...newMessage,
      groupId,
    });

    return setMessage('')
  }

  useEffect(() => {
    socket?.emit("join_group", { groupId, user: session?.user });
    socket?.on('receive_message', (data: SocketMessage) => {
      const newMessage: Message = {
        ...data
      }
      setMessages((prevState) => {
        return [...prevState, newMessage]
      })

      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' })
    })

    return () => {
      socket?.emit("leave_group", { groupId })
    }
  }, [])

  if (!groupId) router.push('/groups')

  return (
    <main className="flex flex-col justify-between w-full h-full max-h-[calc(100vh-4rem)] max-w-[650px] my-2 border rounded-md lg:max-w-[600px] m-auto space-y-6">
      <div className='flex items-center p-4 space-x-2 justify-between border-b '>
        <Link href='/groups' className={cn(buttonVariants({
          variant: 'outline'
        }), 'space-x-2')}>
          <TiArrowBack />
          <span>Groups</span>
        </Link>
        <GroupDropdown group={group as Group} />
      </div>

      <div ref={chatContainerRef} className="overflow-y-scroll h-[calc(100vh-14rem)] w-full flex flex-col space-y-2 p-4">
        {isLoading && <Spinner />}
        {!isLoading && messages && messages.length === 0 ? (
          <EmptyMessages />
        ) : (
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

      <form onSubmit={handleSubmit} className='flex items-center p-8 space-x-2'>
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
