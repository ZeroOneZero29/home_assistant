export interface AllDevice<> {
  devices: Device[];
  rooms: Rooms[];
  status: string;
}
export interface Device {
  id: string;
  name: string;
  type: string;
  room: string;
  capabilities: [];
  properties: [];
}

export interface Rooms {
  id: string;
  devices: [];
  name: string;
}
