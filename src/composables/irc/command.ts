export enum IRCCommand {
  NONE = '',

  // Sent when the bot or moderator removes all messages from the chat room or removes all messages for the specified user.
  CLEARCHAT = 'CLEARCHAT',

  // Sent when the bot removes a single message from the chat room.
  CLEARMSG = 'CLEARMSG',

  // Sent after the bot authenticates with the server.
  GLOBALUSERSTATE = 'GLOBALUSERSTATE',

  // Sent to indicate an event relating to the outcome of an action, such as attempting to join a chatroom you are banned from.
  NOTICE = 'NOTICE',

  // Sent when a user leaves a chatroom, or when your bot is banned from a chatroom it is currently in.
  PART = 'PART',

  // Sent when the server wants to ensure that your bot is still alive and able to respond to the server’s messages.
  PING = 'PING',

  // Sent when a user posts a chat message in the chat room.
  PRIVMSG = 'PRIVMSG',

  // Sent when the Twitch IRC server needs to terminate the connection.
  RECONNECT = 'RECONNECT',

  // Sent when the bot joins a channel or when the channel’s chat settings change.
  ROOMSTATE = 'ROOMSTATE',

  // Sent when events occur in the channel, such as someone subscribing to the channel.
  USERNOTICE = 'USERNOTICE',

  // Sent when the bot joins a channel or sends a PRIVMSG message.
  USERSTATE = 'USERSTATE',
}
