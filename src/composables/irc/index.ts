import { CapReq } from './cap-req'
import { IRCCommand } from './command'

export function useIRC(onMessage: (value: IRC3Message) => unknown) {
  const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443')

  function caps() {
    /* function list() {
      socket.send('CAP LS')
    } */

    async function use(...cap: CapReq[]) {
      socket.send(`CAP REQ :${cap.join(' ')}\n\r`)
    }

    return { use/* , list */ }
  }

  function pass(token: string) {
    socket.send(`PASS ${token}\n\r`)
  }

  function nick(name: string) {
    socket.send(`NICK ${name}\n\r`)
  }

  function join(channel: string) {
    socket.send(`JOIN ${channel}\n\r`)
  }

  function pong(message: string) {
    socket.send(`PONG :${message}\n\r`)
  }

  socket.onopen = () => {
    caps().use(CapReq.MEMBERSHIP, CapReq.TAGS, CapReq.COMMANDS)
    pass('oauth:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    nick(`justinfan${String(Math.floor(Math.random() * 1000))}`)
    join('#sawich')

    socket.onmessage = ({ data }) => {
      for (const message of data.trim().split('\r\n')) {
        console.log(typeof message)
        console.log(`'${message}'`)

        // https://modern.ircdocs.horse/#message-format
        const regexp = /(?:@(?<tags>[^ ]+) )?(?::(?<source>[^ ]+) +)?(?<command>[^ :]+)(?: +(?<middle>[^ :]+(?: +[^ :]+)*))*(?<coda> +:(?<trailing>.*))?/
        const result = regexp.exec(message)

        if (result) {
          const { groups } = result

          if (groups) {
            const { tags = '', source = '', command = '', middle = '', coda = '', trailing = '' } = groups

            if (command === IRCCommand.PING) {
              pong(trailing)
            }

            else {
              onMessage({ tags, source, command, middle, coda, trailing })
            }
          }

          else {
            console.error(`'${message}' has no groups`)
          }
        }

        else {
          console.error(`'${message}' cannot be parsed`)
        }
      }
    }
  }
}
