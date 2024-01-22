'use server'

import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Group } from "@/@types/group";

var groups: Group[] = [
  {
    id: randomUUID(),
    name: 'Main',
    color: '#124565',
    author: {
      name: 'System',
      email: 'system@google.com',
      image: 'https://picsum.photos/200/200'
    },
    includedAt: new Date()
  }
]

export async function GET() { 
  const session = await getServerSession(authOptions)

  if (session) {
    return Response.json({ data: groups })
  }

  return Response.json({ message: "Unauthorized" });
}

export async function POST(req: Request) {
  const newGroup: Group = await req.json();

  groups.push(newGroup);

  return Response.json({ data: groups });
}