import { atom } from 'jotai'
import { io } from 'socket.io-client'

export const socketConnection = atom(io("http://localhost:3001"))
