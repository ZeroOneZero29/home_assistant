export interface Device {
  id: string;
  name: string;
  type: string;
  room: string;
  capabilities: [];
  properties: [];
}

export interface AllDevice<T> {
  devices: T[];
  rooms: object[];
  status: string;
}
