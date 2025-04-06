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
  capabilities: Capabilities[];
  properties: Properties[];
}

export interface Rooms {
  id: string;
  devices: string[];
  name: string;
}

export interface Capabilities {
  type: string;
  state: {
    instance: string;
    value: boolean;
  };
}

export interface Properties {
  type: string;
  state: {
    instance: string;
    value: number;
  };
}

//export interface ErrorDevice {
//  message: string;
//  error: string;
//  statusCode: number;
//}
