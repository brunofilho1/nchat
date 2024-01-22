import { User } from "./user"

export interface Message {
  id: string
  author: User
  body: string
  includedAt: Date
}