import { User } from "./user"

export interface Message {
  _id?: string
  groupId: string
  author: User
  body: string
  includedAt: Date
}