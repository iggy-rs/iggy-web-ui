import { Message, messageMapper } from './Message';

type Payload = {
  partition_id: number,
  current_offset: number,
  messages: Array<Message>,
}

export function messageDetailsMapper(payload: Payload): Array<Message> {
  return payload.messages.map(messageMapper);
}
