'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Group } from "@/@types/group";
import { NextApiRequest } from "next";

var groups: Group[] = [
  {
    id: 'NZBNssJHD-asdAZXnnAd-JjkaA90LÇ0d-AJKKsd7656asA',
    name: 'Main',
    color: '#fcba03',
    author: {
      name: 'System',
      email: 'system@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  }
]

export async function GET(req: NextApiRequest) {
  const session = await getServerSession(authOptions)
  const groupId = new URL(req.url!).searchParams.get('groupId')
  const search = new URL(req.url!).searchParams.get('search')

  if (session) {
    if (groupId) return Response.json({ data: groups.find((g) => g.id === groupId) })
    
    if (search) return Response.json({ data: groups.filter((g) => g.name.includes(search) || g.author.name.includes(search)) })

    return Response.json({ data: groups })
  }

  return Response.json({ message: "Unauthorized" });
}

export async function POST(req: Request) {
  const newGroup: Group = await req.json();

  groups.push(newGroup);

  return Response.json({ data: groups });
}