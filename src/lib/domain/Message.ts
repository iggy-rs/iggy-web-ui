export type Message = {
  checksum: number;
  header: Record<string, string>;
  id: number;
  offset: number;
  payload: string;
  truncatedPayload: string
  state: "available";
  timestamp: number;
};

export function messageMapper(item: any): Message {
  let payload = "";

  try {
    payload = atob(item.payload)
  } catch {
    payload = "[NOT DECODABLE]"
  }

  let truncatedPayload = payload;
  if (payload.length > 100) {
    truncatedPayload = `${payload.slice(0, 100)} [...]`
  }

  return {
    id: item.id,
    header: item.header,
    offset: item.offset,
    payload,
    state: item.state,
    timestamp: item.timestamp,
    checksum: item.checksum,
    truncatedPayload,
  };
}
