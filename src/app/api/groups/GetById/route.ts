import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectMongo from "@/lib/mongodb";
import { BSON } from "mongodb";

export async function GET(req: NextApiRequest) {
  const session = await getServerSession(authOptions)
  const groupId = new URL(req.url!).searchParams.get('groupId')

  try {
    const client = await connectMongo();
    const db = client?.db('nchat').collection('groups')
  
    if (session) {
      const group = await db?.findOne({ "_id": new BSON.ObjectId(groupId as string) })
      return Response.json({ data: group }, { status: 200 })
    }
    
    return Response.json({ message: "You're not authorized to perform this action", error: 'Unauthorized' }, { status: 500 });
  } catch (error) {
    return Response.json({ message: 'Something went wrong when search the group!', error: error }, { status: 500 })
  }
}