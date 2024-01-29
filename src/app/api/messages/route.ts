'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectMongo from "@/lib/mongodb";


export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const groupId = new URL(req.url!).searchParams.get('groupId')

  try {
    const client = await connectMongo();
    const db = client?.db('nchat').collection('messages')
  
    if (session && groupId) {
      const messages = await db?.find({ groupId }).toArray() || []
      return Response.json({ data: messages }, { status: 200 })
    }
  
    return Response.json({ message: "You're not authorized to perform this action", error: 'Unauthorized' }, { status: 500 });
  } catch (error) {
    return Response.json({ message: 'Something went wrong when saving the new message!', error: error }, { status: 500 });
  }

}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  try {
    const client = await connectMongo();
    const db = client?.db('nchat').collection('messages')

    if (session) {
      const message = await db?.insertOne(await req.json())
  
      return Response.json({ data: message, message: 'New message saved successfully!' }, { status: 200 });
    }

    return Response.json({ message: "You're not authorized to perform this action", error: 'Unauthorized' }, { status: 500 });
  } catch (error) {
    return Response.json({ message: 'Something went wrong when saving the new message!', error: error }, { status: 500 });
  }
}