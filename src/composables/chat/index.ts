import type { roleList } from '@/components/window/chat/roles'

import { fakerRU as faker } from '@faker-js/faker'
import { useIRC } from '../irc'

export const useChat = createGlobalState(() => {
  const messages = reactive<ChatItem[]>([])

  useIRC(({ tags, /* source, */ command, /* middle, coda, */ trailing }) => {
    if (command === 'PRIVMSG') {
      const meta = {
        'badge-info': '',
        'badges': '',
        'client-nonce': '',
        'color': '',
        'display-name': '',
        'emotes': '',
        'first-msg': '',
        'flags': '',
        'id': '',
        'mod': '',
        'returning-chatter': '',
        'room-id': '',
        'subscriber': '',
        'tmi-sent-ts': '',
        'turbo': '',
        'user-id': '',
        'user-type': '',
      } as Record<string, string>

      const regexp = /(?<key>[A-Z0-9-\\/]+)(?:=(?<value>[^\r\n;]*))?(?:;|$)/gi

      while (true) {
        const result = regexp.exec(tags)
        if (!result) {
          break
        }

        const { groups } = result
        if (groups) {
          const { key = '', value = '' } = groups
          if (key && value) {
            meta[key] = value
          }
        }
      }

      const badges = meta.badges.split(',')
      function getRole(badges: string[]): ReturnType<typeof roleList>[number] {
        const sets = [
          ['broadcaster', 'bro'],
          ['moderator', 'mod'],
          ['subscriber', 'sub'],
          ['artist', 'art'],
          ['vip', 'vip'],
        ] as [string, ReturnType<typeof roleList>[number]][]

        for (const [name, role] of sets) {
          for (const badge of badges) {
            if (badge.includes(name)) {
              return role
            }
          }
        }

        return 'view'
      }

      messages.push({
        uuid: faker.string.uuid(),
        time: new Date(Number(meta['tmi-sent-ts'])),
        color: meta.color,
        name: meta['display-name'],
        role: getRole(badges),
        text: trailing,
      })
    }
  })

  return { messages }
})
