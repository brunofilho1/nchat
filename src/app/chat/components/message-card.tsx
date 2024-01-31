import { Message } from "@/@types/message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import MessageOptionsDropdown from "./message-options-dropdown";
import { Dispatch, SetStateAction } from "react";

interface MessageCard { 
  message: Message, 
  setMessages: Dispatch<SetStateAction<Message[]>> 
}

const MessageCard = ({ message, setMessages }: MessageCard) => {
  const { data: session } = useSession()
  return (
    <div
      data-itsme={message.author.email === session?.user?.email}
      key={message._id}
      className='relative group data-[itsme=true]:self-end border p-4 w-fit rounded-md'
    >
      <MessageOptionsDropdown message={message} setMessages={setMessages} />
      <div className='flex items-center space-x-4 justify-between'>
        <div className='flex items-center space-x-2 text-muted-foreground'>
          <Avatar className="h-6 w-6">
            <AvatarImage src={message.author.image} alt={message.author.name} />
            <AvatarFallback>{message.author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{message.author.name}</span>
        </div>
        <span className='text-sm text-muted-foreground'>{new Date(message.includedAt).toLocaleTimeString()}</span>
      </div>
      <p>{message.body}</p>
    </div>
  );
}

export default MessageCard