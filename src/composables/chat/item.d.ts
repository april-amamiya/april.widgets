import type { roleList } from '@/components/window/chat/roles'

export {}

declare global {
  interface ChatItem {
    uuid: string
    time: Date,
    color: string
    name: string
    role: ReturnType<typeof roleList>[number]
    text: string
  }
}
