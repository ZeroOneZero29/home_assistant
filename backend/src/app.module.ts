import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './device/device.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5433,
      username: process.env.DB_USERNAME,

      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    DeviceModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
