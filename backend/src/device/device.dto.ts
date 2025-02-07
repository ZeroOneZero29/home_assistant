import { IsString } from 'class-validator';

export class DeviceDto {
  @IsString()
  deviceID: number;
}
