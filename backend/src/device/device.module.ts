import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [HttpModule, ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [DeviceService, UserService],
  controllers: [DeviceController],
})
export class DeviceModule {}
