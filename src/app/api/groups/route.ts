'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest } from "next";
import connectMongo from "@/lib/mongodb";

export async function GET(req: NextApiRequest) {
  const session = await getServerSession(authOptions)
  const search = new URL(req.url!).searchParams.get('search')

  try {
    const client = await connectMongo();
    const db = client?.db('nchat').collection('groups')

    if (session) {
      if (search) return Response.json({ data: await db?.find({ "name": { '$regex': search, '$options' : 'i' } }).toArray() })

      return Response.json({ data: await db?.find().toArray() || [] })
    }

    return Response.json({ message: "Unauthorized" });
  } catch (error) {
    return Response.json({ message: 'Something went wrong when searching the groups!', error: error, status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  try {
    const client = await connectMongo();
    const db = client?.db('nchat').collection('groups')

    if (session) {
      const group = await db?.insertOne(await req.json())

      return Response.json({ data: group, group: 'New group saved successfully!', status: 200 });
    }

    return Response.json({ message: "Unauthorized" });
  } catch (error) {
    return Response.json({ message: 'Something went wrong when saving the new group!', error: error, status: 500 });
  }
}