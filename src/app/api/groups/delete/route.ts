import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectMongo from "@/lib/mongodb";
import { Message } from "@/@types/message";
import { BSON } from "mongodb";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const groupToDelete: Message = await req.json()

  try {
    const client = await connectMongo();
    const db = client?.db('nchat').collection('groups')
  
    if (session && session.user?.email === groupToDelete.author.email) {
      const group = await db?.deleteOne({
        _id: new BSON.ObjectId(groupToDelete._id)
      })

      return Response.json({ data: group, message: 'Group deleted successfully!' }, { status: 200 });
    }
    
    return Response.json({ message: "You're not authorized to perform this action", error: 'Unauthorized' }, { status: 500 });
  } catch (error) {
    return Response.json({ message: 'Something went wrong when deleting the message!', error: error }, { status: 500 })
  }
}