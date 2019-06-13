class Message {
  constructor(public user: String, public name: String) {}
}
export class MessageObj {
  constructor(public name: String, public message: Message) {}
}
