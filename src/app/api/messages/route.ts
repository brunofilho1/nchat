'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectMongo from "@/lib/mongodb";


export async function GET(req: Request) { 
  const session = await getServerSession(authOptions)
  const groupId = new URL(req.url!).searchParams.get('groupId')

  const client = await connectMongo();
  const db = client?.db('nchat').collection('messages')

  if (session && groupId) {
    const messages = await db?.find({ groupId }).toArray() || []
    return Response.json({ data: messages })
  }

  return Response.json({ message: "Unauthorized" });
}

export async function POST(req: Request) {
  const client = await connectMongo();
  const db = client?.db('nchat').collection('messages')

  try {
    const message = await db?.insertOne(await req.json())

    return Response.json({ data: message, message: 'New message saved successfully!', status: 200 });
  } catch (error) {
    return Response.json({ message: 'Something went wrong when saving the new message!', error: error, status: 500 });
  }
}