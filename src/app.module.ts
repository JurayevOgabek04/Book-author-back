import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectDb } from './config/typeorm'

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(connectDb)],
})
export class AppModule { }
