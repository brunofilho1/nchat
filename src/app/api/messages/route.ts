'use server'

import { Message } from "@/@types/message"
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

var messages: Message[] = [
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
  {
    id: randomUUID(),
    body: 'testing message from my api routes',
    author: {
      name: 'Lupi Oliveira',
      email: 'lupi@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  },
]

export async function GET() { 
  const session = await getServerSession(authOptions)

  if (session) {
    return Response.json({ data: messages })
  }

  return Response.json({ message: "Unauthorized" });
}

export async function POST(req: Request) {
  const newMessage: Message = await req.json();

  messages.push(newMessage);

  return Response.json({ data: messages });
}