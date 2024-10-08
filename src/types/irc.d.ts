import type { IRCCommand } from '@/composables/irc/command'

export {}

declare global {
  interface IRC3Message {
    tags: string
    source: string
    command: string
    middle: string
    coda: string
    trailing: string
  }
}
